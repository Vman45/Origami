import * as Geom from "../../include/geometry";
// todo: make_edges_faces c-clockwise

// faces_faces is a set of faces edge-adjacent to a face. for every face.
export const make_faces_faces = function(graph) {
	let nf = graph.faces_vertices.length;
	let faces_faces = Array.from(Array(nf)).map(() => []);
	let edgeMap = {};
	graph.faces_vertices.forEach((vertices_index, idx1) => {
		if (vertices_index === undefined) { return; }  //todo: necessary?
		let n = vertices_index.length;
		vertices_index.forEach((v1, i, vs) => {
			let v2 = vs[(i + 1) % n];
			if (v2 < v1) [v1, v2] = [v2, v1];
			let key = v1 + " " + v2;
			if (key in edgeMap) {
				let idx2 = edgeMap[key];
				faces_faces[idx1].push(idx2);
				faces_faces[idx2].push(idx1);
			} else {
				edgeMap[key] = idx1;
			}
		});
	});
	return faces_faces;
}

export const make_edges_faces = function(graph) {
	let edges_faces = Array
		.from(Array(graph.edges_vertices.length))
		.map(_ => []);
	// todo: does not arrange counter-clockwise
	graph.faces_edges.forEach((face,i) => face
		.forEach(edge => edges_faces[edge].push(i))
	);
	return edges_faces;
}

// export const make_vertices_faces = function(graph) {
// 	let vertices_faces = Array
// 		.from(Array(graph.faces_vertices.length))
// 		.map(_ => []);
// 	graph.faces_vertices.forEach((face,i) => face
// 		.forEach(vertex => vertices_faces[vertex].push(i))
// 	);
// 	return vertices_faces;
// }


const edge_vertex_map = function(graph) {
	let map = {};
	graph.edges_vertices
		.map(ev => ev.sort((a,b) => a-b).join(" "))
		.forEach((key,i) => map[key] = i);
	return map;
};

// root_face will become the root node
export const make_face_walk_tree = function(graph, root_face = 0) {
	let edge_map = edge_vertex_map(graph);
	// console.log("edge_map", edge_map)
	let new_faces_faces = make_faces_faces(graph);
	if (new_faces_faces.length <= 0) {
		return [];
	}
	var visited = [root_face];
	var list = [[{
		face: root_face,
		parent: undefined,
		edge: undefined,
		level: 0
	}]];
	// let current_level = 0;
	do{
		// current_level += 1;
		list[list.length] = list[list.length-1].map((current) =>{
			let unique_faces = new_faces_faces[current.face]
				.filter(f => visited.indexOf(f) === -1);
			visited = visited.concat(unique_faces);
			return unique_faces.map(f => {
				let edge_vertices = graph.faces_vertices[f]
						.filter(v => graph.faces_vertices[current.face].indexOf(v) !== -1)
						.sort((a,b) => a-b);
				let edge = edge_map[edge_vertices.join(" ")];
				// console.log(" -- looking up", edge_vertices.join(" "), edge);
				return {
					face: f,
					parent: current.face,
					// level: current_level,
					edge: edge,
					edge_vertices: edge_vertices
				};
			})
		}).reduce((prev,curr) => prev.concat(curr),[])
	} while(list[list.length-1].length > 0);
	if(list.length > 0 && list[list.length-1].length == 0){ list.pop(); }
	return list;
};

/**
 * for quickly determining which side of a crease a face lies
 * this uses point average, not centroid, faces must be convex
 * and again it's not precise, only use this for sided-ness calculation
 */
export const face_center_pt_average = function(graph, face_index) {
	return graph.faces_vertices[face_index]
		.map(v => graph.vertices_coords[v])
		.reduce((a,b) => [a[0]+b[0], a[1]+b[1]], [0,0])
		.map(el => el/graph.faces_vertices[face_index].length);
};

///////////////////////////////////////////////
// MATRICES
///////////////////////////////////////////////

export const make_faces_matrix = function(graph, root_face) {
	// if edge_orientations includes marks AND mountains/valleys,
	// then perform folds only along mountains and valleys
	// if edge_orientations doesn't exist, or only includes marks/borders,
	// then perform folds along all marks
	// let edge_fold = graph.edges_vertices.map(_ => true);
	let skip_marks = ("edges_assignment" in graph === true)
	let edge_fold = skip_marks
		? graph.edges_assignment.map(a => a!=="f"&&a!=="F"&&a!=="u"&&a!=="U")
		: graph.edges_vertices.map(_ => true);

	let faces_matrix = graph.faces_vertices.map(v => [1,0,0,1,0,0]);
	make_face_walk_tree(graph, root_face).forEach((level) =>
		level.filter((entry) => entry.parent != null).forEach((entry) => {
			let verts = entry.edge_vertices.map(v => graph.vertices_coords[v]);
			let vec = [verts[1][0] - verts[0][0], verts[1][1] - verts[0][1]];
			// let local = Geom.core.make_matrix2_reflection(vec, verts[0]);
			let local = edge_fold[entry.edge]
				? Geom.core.make_matrix2_reflection(vec, verts[0])
				: [1,0,0,1,0,0];
			faces_matrix[entry.face] =
				Geom.core.multiply_matrices2(faces_matrix[entry.parent], local);
		})
	);
	return faces_matrix;
};

export const make_faces_matrix_inv = function(graph, root_face) {
	let edge_fold = ("edges_assignment" in graph === true)
		? graph.edges_assignment.map(a => a!=="f"&&a!=="F"&&a!=="u"&&a!=="U")
		: graph.edges_vertices.map(_ => true);

	let faces_matrix = graph.faces_vertices.map(v => [1,0,0,1,0,0]);
	make_face_walk_tree(graph, root_face).forEach((level) =>
		level.filter((entry) => entry.parent != null).forEach((entry) => {
			let verts = entry.edge_vertices.map(v => graph.vertices_coords[v]);
			let vec = [verts[1][0] - verts[0][0], verts[1][1] - verts[0][1]];
			// let local = Geom.core.make_matrix2_reflection(vec, verts[0]);
			let local = edge_fold[entry.edge]
				? Geom.core.make_matrix2_reflection(vec, verts[0])
				: [1,0,0,1,0,0];
			faces_matrix[entry.face] =
				Geom.core.multiply_matrices2(local, faces_matrix[entry.parent]);
		})
	);
	return faces_matrix;
};

export const faces_matrix_coloring = function(faces_matrix) {
	return faces_matrix
		.map(m => m[0] * m[3] - m[1] * m[2])
		.map(c => c >= 0);
}
/**
 * true/false: which face shares color with root face
 * the root face (and any similar-color face) will be marked as true
 */
export const faces_coloring = function(graph, root_face = 0){
	let coloring = [];
	coloring[root_face] = true;
	make_face_walk_tree(graph, root_face).forEach((level, i) => 
		level.forEach((entry) => coloring[entry.face] = (i % 2 === 0))
	);
	return coloring;
}

/**
 * get the boundary face defined in vertices and edges by walking boundary
 * edges, defined by edges_assignment. no planar calculations
 */
export const get_boundary_face = function(graph) {
	let edges_vertices_b = graph.edges_assignment
		.map(a => a === "B" || a === "b");
	let vertices_edges = graph.vertices_coords.map(_ => []);
	graph.edges_vertices.forEach((ev,i) =>
		ev.forEach(v => vertices_edges[v].push(i))
	);
	let edge_walk = [];
	let vertex_walk = [];
	let edgeIndex = -1;
	for (let i = 0; i < edges_vertices_b.length; i++) {
		if (edges_vertices_b[i]) { edgeIndex = i; break; }
	}
	edges_vertices_b[edgeIndex] = false;
	edge_walk.push(edgeIndex);
	vertex_walk.push(graph.edges_vertices[edgeIndex][0]);
	let nextVertex = graph.edges_vertices[edgeIndex][1];
	while (vertex_walk[0] !== nextVertex) {
		vertex_walk.push(nextVertex);
		edgeIndex = vertices_edges[nextVertex]
			.filter(v => edges_vertices_b[v])
			.shift();
		if (graph.edges_vertices[edgeIndex][0] === nextVertex) {
			nextVertex = graph.edges_vertices[edgeIndex][1];
		} else {
			nextVertex = graph.edges_vertices[edgeIndex][0];
		}
		edges_vertices_b[edgeIndex] = false;
		edge_walk.push(edgeIndex);
	}
	return {
		vertices: vertex_walk,
		edges: edge_walk,
	};
}

export const get_boundary_vertices = function(graph) {
	let edges_vertices_b = graph.edges_vertices.filter((ev,i) =>
		graph.edges_assignment[i] === "B" ||
		graph.edges_assignment[i] === "b"
	).map(arr => arr.slice());
	if (edges_vertices_b.length === 0) { return []; }
	// the index of keys[i] is an edge_vertex from edges_vertices_b
	//  the [] value is the indices in edges_vertices_b this i appears
	let keys = Array.from(Array(vertices_count(graph))).map(_ => [])
	edges_vertices_b.forEach((ev,i) => ev.forEach(e => keys[e].push(i)))
	let edgeIndex = 0;
	let startVertex = edges_vertices_b[edgeIndex].shift();
	let nextVertex = edges_vertices_b[edgeIndex].shift();
	let vertices = [startVertex];
	while (vertices[0] !== nextVertex) {
		vertices.push(nextVertex);
		let whichEdges = keys[nextVertex];
		let thisKeyIndex = keys[nextVertex].indexOf(edgeIndex);
		if (thisKeyIndex === -1) { return; }
		keys[nextVertex].splice(thisKeyIndex, 1);
		let nextEdgeAndIndex = keys[nextVertex]
			.map((el,i) => ({key: el, i: i}))
			.filter(el => el.key !== edgeIndex).shift();
		if (nextEdgeAndIndex == null) { return; }
		keys[nextVertex].splice(nextEdgeAndIndex.i, 1);
		edgeIndex = nextEdgeAndIndex.key;
		let lastEdgeIndex = edges_vertices_b[edgeIndex].indexOf(nextVertex);
		if (lastEdgeIndex === -1) { return; }
		edges_vertices_b[edgeIndex].splice(lastEdgeIndex, 1);
		nextVertex = edges_vertices_b[edgeIndex].shift();
	}
	return vertices;
}