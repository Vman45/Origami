
export const empty = {
	"file_spec": 1.1,
	"file_creator": "",
	"file_author": "",
	"file_classes": [],
	"frame_attributes": [],
	"frame_title": "",
	"frame_classes": [],
	"vertices_coords": [],
	"edges_vertices": [],
	"edges_faces": [],
	"edges_assignment": [],
	"edges_foldAngle": [],
	"edges_length": [],
	"faces_vertices": [],
	"faces_edges": [],
	"edgeOrders": [],
	"faceOrders": [],
	"file_frames": []
};

export const unitSquare = {
	"file_spec": 1.1,
	"file_creator": "",
	"file_author": "",
	"file_classes": ["singleModel"],
	"frame_attributes": ["2D"],
	"frame_title": "",
	"frame_classes": ["creasePattern"],
	"vertices_coords": [[0,0], [1,0], [1,1], [0,1]],
	"edges_vertices": [[0,1], [1,2], [2,3], [3,0]],
	"edges_assignment": ["B","B","B","B"],
	"faces_vertices": [[0,1,2,3]],
	"faces_edges": [[0,1,2,3]],
	"file_frames": [{
		"frame_classes": ["creasePattern"],
		"frame_parent":0,
		"inherit":true
	}]
};

export const blintz = {
	"file_spec": 1.1,
	"frame_title": "blintz base",
	"file_classes": ["singleModel"],
	"frame_classes": ["foldedState"],
	"frame_attributes": ["2D"],
	"vertices_coords": [[0.5,0.5], [0.5,0], [0.5,0.5], [1,0.5], [0.5,0.5], [0.5,1], [0.5,0.5], [0,0.5]],
	"edges_vertices": [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,7], [7,0], [1,3], [3,5], [5,7], [7,1]],
	"edges_assignment": ["B","B","B","B","B","B","B","B","V","V","V","V"],
	"faces_vertices": [[0,1,7], [2,3,1], [4,5,3], [6,7,5], [1,3,5,7]],
	"file_frames": [{
		"frame_classes": ["creasePattern"],
		"frame_parent": 0,
		"inherit": true,
		"vertices_coords": [[0,0], [0.5,0], [1,0], [1,0.5], [1,1], [0.5,1], [0,1], [0,0.5]]
	}]
};

export const kite = {
	"file_spec": 1.1,
	"frame_title": "kite base",
	"file_classes": ["singleModel"],
	"frame_classes": ["creasePattern"],
	"frame_attributes": ["2D"],
	"vertices_coords": [[0,0],[1,0],[1,1],[0,1],[0.414213562373095,0],[1,0.585786437626905]],
	"edges_vertices": [[2,3],[3,0],[3,1],[3,4],[0,4],[4,1],[3,5],[1,5],[5,2]],
	"edges_assignment": ["B","B","V","M","B","B","M","B","B"],
	"faces_vertices": [[2,3,5],[3,0,4],[3,1,5],[1,3,4]],
	"file_frames": [{
		"frame_classes": ["foldedState"],
		"frame_parent": 0,
		"frame_inherit": true,
		"vertices_coords": [[0.707106781186548,0.292893218813452],[1,0],[0.707106781186548,0.292893218813452],[0,1],[0.414213562373095,0],[1,0.585786437626905]]
	}]
};

export const fish = {
	"file_spec": 1.1,
	"frame_title": "fish base",
	"file_author": "Robby Kraft",
	"file_classes": ["singleModel"],
	"frame_classes": ["creasePattern"],
	"frame_attributes": ["2D"],
	"vertices_coords": [[0,0],[1,0],[1,1],[0,1],[0.292893218813452,0.292893218813452],[0.707106781186548,0.707106781186548],[0.292893218813452,0],[1,0.707106781186548]],
	"edges_vertices": [[2,3],[3,0],[3,1],[0,4],[1,4],[3,4],[1,5],[2,5],[3,5],[4,6],[0,6],[6,1],[5,7],[1,7],[7,2]],
	"edges_assignment": ["B","B","F","M","M","M","M","M","M","V","B","B","V","B","B"],
	"faces_vertices": [[2,3,5],[3,0,4],[3,1,5],[1,3,4],[4,0,6],[1,4,6],[5,1,7],[2,5,7]],
	"faces_edges": [[0,8,7],[1,3,5],[2,6,8],[2,5,4],[3,10,9],[4,9,11],[6,13,12],[7,12,14]],
	"file_frames": [{
		"frame_classes": ["foldedState"],
		"frame_parent": 0,
		"frame_inherit": true,
		"vertices_coords": [[0.707106781186548,0.292893218813452],[1,0],[0.707106781186548,0.292893218813452],[0,1],[0.292893218813452,0.292893218813452],[0.707106781186548,0.707106781186548],[0.5,0.5],[0.5,0.5]]
	}]
};

export const bird = {
	"file_spec": 1.1,
	"frame_title": "bird base",
	"file_classes": ["singleModel"],
	"frame_classes": ["creasePattern"],
	"frame_attributes": ["2D"],
	"vertices_coords": [[0,0],[1,0],[1,1],[0,1],[0.5,0.5],[0.207106781186548,0.5],[0.5,0.207106781186548],[0.792893218813452,0.5],[0.5,0.792893218813452],[0.353553390593274,0.646446609406726],[0.646446609406726,0.646446609406726],[0.646446609406726,0.353553390593274],[0.353553390593274,0.353553390593274],[0,0.5],[0.5,0],[1,0.5],[0.5,1]],
	"edges_vertices": [[3,5],[0,5],[4,5],[0,6],[1,6],[4,6],[1,7],[2,7],[4,7],[2,8],[3,8],[4,8],[5,9],[9,8],[9,4],[3,9],[8,10],[10,7],[4,10],[10,2],[7,11],[11,6],[4,11],[11,1],[6,12],[12,5],[0,12],[12,4],[5,13],[0,13],[13,3],[6,14],[0,14],[14,1],[7,15],[1,15],[15,2],[8,16],[3,16],[16,2]],
	"edges_faces": [[0,1],[0,5],[21,0],[1],[2,1],[2,3],[2],[3,6],[4,3],[4,5],[11,4],[5,22],[6,7],[6,11],[7],[8,7],[8,9],[8],[9,12],[10,9],[10,11],[17,10],[12,13],[12,17],[13],[14,13],[14,15],[14],[15,18],[16,15],[16,17],[23,16],[18,19],[18,23],[19],[20,19],[20,21],[20],[22,21],[22,23]],
	"edges_assignment": ["M","M","M","M","M","M","M","M","M","M","M","M","F","F","F","F","F","F","V","V","F","F","F","F","F","F","V","V","V","B","B","V","B","B","V","B","B","V","B","B"],
	"faces_vertices": [[3,5,9],[5,3,13],[0,5,13],[5,0,12],[4,5,12],[5,4,9],[0,6,12],[6,0,14],[1,6,14],[6,1,11],[4,6,11],[6,4,12],[1,7,11],[7,1,15],[2,7,15],[7,2,10],[4,7,10],[7,4,11],[2,8,10],[8,2,16],[3,8,16],[8,3,9],[4,8,9],[8,4,10]],
	"faces_edges": [[0,1,2],[0,3,4],[5,4,6],[5,7,8],[9,8,10],[9,11,1],[12,13,7],[12,14,15],[16,15,17],[16,18,19],[20,19,21],[20,10,13],[22,23,18],[22,24,25],[26,25,27],[26,28,29],[30,29,31],[30,21,23],[32,33,28],[32,34,35],[36,35,37],[36,2,38],[39,38,11],[39,31,33]]
};

export const frog = {
	"file_spec": 1.1,
	"frame_title": "frog base",
	"file_classes": ["singleModel"],
	"frame_classes": ["creasePattern"],
	"frame_attributes": ["2D"],
	"vertices_coords": [[0,0],[1,0],[1,1],[0,1],[0.5,0.5],[0,0.5],[0.5,0],[1,0.5],[0.5,1],[0.146446609406726,0.353553390593274],[0.353553390593274,0.146446609406726],[0.646446609406726,0.146446609406726],[0.853553390593274,0.353553390593274],[0.853553390593274,0.646446609406726],[0.646446609406726,0.853553390593274],[0.353553390593274,0.853553390593274],[0.146446609406726,0.646446609406726],[0,0.353553390593274],[0,0.646446609406726],[0.353553390593274,0],[0.646446609406726,0],[1,0.353553390593274],[1,0.646446609406726],[0.646446609406726,1],[0.353553390593274,1]],
	"edges_vertices": [[0,4],[4,2],[3,4],[4,1],[4,5],[4,6],[4,7],[4,8],[0,9],[4,9],[5,9],[4,10],[0,10],[6,10],[1,11],[4,11],[6,11],[4,12],[1,12],[7,12],[2,13],[4,13],[7,13],[4,14],[2,14],[8,14],[3,15],[4,15],[8,15],[4,16],[3,16],[5,16],[9,17],[0,17],[17,5],[16,18],[5,18],[18,3],[10,19],[0,19],[19,6],[11,20],[6,20],[20,1],[12,21],[1,21],[21,7],[13,22],[7,22],[22,2],[14,23],[8,23],[23,2],[15,24],[3,24],[24,8]],
	"edges_faces": [[0,1],[0,8],[16,0],[1,18],[11,1],[3,2],[2,26],[15,2],[3,12],[24,3],[4,5],[4,14],[28,4],[5,30],[9,5],[7,6],[6,22],[13,6],[7,10],[20,7],[8,9],[8,17],[31,9],[10,11],[10,21],[19,11],[12,13],[12,25],[23,13],[14,15],[14,29],[27,15],[16,17],[16],[17],[18],[19,18],[19],[20,21],[20],[21],[22],[23,22],[23],[24,25],[24],[25],[26],[27,26],[27],[28,29],[28],[29],[30],[31,30],[31]],
	"edges_assignment": ["V","V","V","M","V","V","V","V","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","V","B","B","V","B","B","V","B","B","V","B","B","V","B","B","V","B","B","V","B","B","V","B","B"],
	"faces_vertices": [[0,4,9],[4,0,10],[4,2,14],[2,4,13],[3,4,15],[4,3,16],[4,1,12],[1,4,11],[4,5,9],[5,4,16],[4,6,11],[6,4,10],[4,7,13],[7,4,12],[4,8,15],[8,4,14],[0,9,17],[9,5,17],[10,0,19],[6,10,19],[1,11,20],[11,6,20],[12,1,21],[7,12,21],[2,13,22],[13,7,22],[14,2,23],[8,14,23],[3,15,24],[15,8,24],[16,3,18],[5,16,18]],
	"faces_edges": [[0,1,2],[0,3,4],[5,6,7],[5,8,9],[10,11,12],[10,13,14],[15,16,17],[15,18,19],[20,21,1],[20,14,22],[23,24,18],[23,4,25],[26,27,8],[26,17,28],[29,30,11],[29,7,31],[2,32,33],[21,34,32],[3,35,36],[25,36,37],[19,38,39],[24,40,38],[16,41,42],[28,42,43],[9,44,45],[27,46,44],[6,47,48],[31,48,49],[12,50,51],[30,52,50],[13,53,54],[22,54,55]]
};

export const test = {
	"file_spec":1.1,
	"file_creator":"Rabbit Ear",
	"file_author":"Robby Kraft",
	"file_classes":["singleModel"],
	"frame_attributes":["2D"],
	"frame_title":"three crease",
	"frame_classes":["creasePattern"],
	"vertices_coords":[
		[0,0],[1,0],[1,1],[0,1],[1,0.21920709774914],[0,0.75329794695316],[0.1,1],[0,0.9],[0.506713890898239,0],[0.645319539098137,0.408638686308289],[1,0.871265438078371]
	],
	"edges_vertices":[[8,9],[5,9],[0,5],[0,8],[5,7],[9,10],[2,10],[2,6],[6,7],[3,6],[3,7],[1,8],[1,4],[4,9],[4,10]],
	"edges_assignment":["M","M","B","B","B","V","B","B","V","B","B","B","B","M","B"],
	"faces_vertices":[[8,9,5,0],[7,5,9,10,2,6],[6,3,7],[8,1,4,9],[9,4,10]],
	"faces_edges":[[0,1,2,3],[4,1,5,6,7,8],[9,10,8],[11,12,13,0],[13,14,5]],
	"faces_layer":[0,1,2,4,3],
	"file_frames": [{
		"frame_classes": ["foldedState"],
		"frame_parent": 0,
		"frame_inherit": true,
		"vertices_coords":[
			[0.62607055446971, 1.17221733980796],
			[0.44072549605688, 0.90956291495505],
			[1, 1],
			[0.1, 0.9],
			[0.37030057556411, 0.70197659007504],
			[0, 0.75329794695316],
			[0.1, 1],
			[0, 0.9],
			[0.90786114793244, 0.75108431015443],
			[0.64531953909814, 0.40863868630829],
			[1, 0.87126543807837]
		]
	}]
}

export const dodecagon = {
	"file_spec": 1.1,
	"file_creator": "",
	"file_author": "",
	"file_classes": ["singleModel"],
	"frame_attributes": ["2D"],
	"frame_title": "",
	"frame_classes": ["creasePattern"],
	"vertices_coords": [
		[1,0],[0.8660254,0.5],[0.5,0.8660254],[0,1],[-0.5,0.8660254],[-0.8660254,0.5],[-1,0],[-0.8660254,-0.5],[-0.5,-0.8660254],[0,-1],[0.5,-0.8660254],[0.8660254,-0.5]
	],
	"edges_vertices": [
		[0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,7], [7,8], [8,9], [9,10], [10,11], [11,0]
	],
	"edges_assignment": ["B","B","B","B","B","B","B","B","B","B","B","B"],
	"faces_vertices": [[0,1,2,3,4,5,6,7,8,9,10,11]],
	"faces_edges": [[0,1,2,3,4,5,6,7,8,9,10,11]],
	"file_frames": [{
		"frame_classes": ["foldedState"],
		"frame_parent":0,
		"inherit":true
	}]
};
