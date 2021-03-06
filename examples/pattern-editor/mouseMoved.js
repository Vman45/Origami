const MouseMoved = function () {
  const { app } = window;
  const { RabbitEar } = window;

  if (app.tapLayer == null) { app.tapLayer = app.origami.svg.group(); }
  if (app.dragRect == null) { app.dragRect = []; }

  app.origami.svg.mouseMoved = function (mouse) {
    app.tapLayer.removeChildren();
    Array.from(app.origami.svg.groups.edges.childNodes).forEach(edge => edge.removeAttribute("style"));
    Array.from(app.origami.svg.groups.faces.childNodes).forEach(face => face.removeAttribute("style"));

    app.nearest = app.origami.nearest(mouse);

    if (mouse.isPressed) {
      app.dragRect[0] = Math.min(mouse.pressed[0], mouse[0]);
      app.dragRect[1] = Math.min(mouse.pressed[1], mouse[1]);
      app.dragRect[2] = Math.max(mouse.pressed[0], mouse[0]) - app.dragRect[0];
      app.dragRect[3] = Math.max(mouse.pressed[1], mouse[1]) - app.dragRect[1];
    }

    if (mouse.isPressed) {
      switch (app.tapMode) {
        case "segment":
          app.tapLayer.line(mouse.pressed[0], mouse.pressed[1], mouse[0], mouse[1])
            .stroke("black")
            .strokeWidth(0.005);
          break;
        case "point-to-point":
          app.tapLayer.arrow(mouse.pressed[0], mouse.pressed[1], mouse[0], mouse[1])
            .stroke("black")
            .fill("black")
            .head({ width: 0.015, height: 0.05 })
            .curve(0.25)
            .strokeWidth(0.01);
          break;
        case "bisect": {
          const edgeA = app.nearestPressed.edge.index;
          const edgeB = app.nearest.edge.index;
          const g = app.origami;
          const a0 = g.vertices_coords[g.edges_vertices[edgeA][0]];
          const a1 = g.vertices_coords[g.edges_vertices[edgeA][1]];
          const b0 = g.vertices_coords[g.edges_vertices[edgeB][0]];
          const b1 = g.vertices_coords[g.edges_vertices[edgeB][1]];
          const aVec = [a1[0] - a0[0], a1[1] - a0[1]];
          const bVec = [b1[0] - b0[0], b1[1] - b0[1]];
          const nearestA = RabbitEar.math.nearest_point_on_line(
            a0,
            aVec,
            mouse.pressed,
            ((x) => { if (x < 0) return 0; if (x > 1) return 1; return x; })
          );
          const nearestB = RabbitEar.math.nearest_point_on_line(
            b0,
            bVec,
            mouse,
            ((x) => { if (x < 0) return 0; if (x > 1) return 1; return x; })
          );

          const intersection = RabbitEar.math.intersection.line_line(a0, aVec, b0, bVec);
          if (intersection) {
            const vecArc = [nearestB[0] - nearestA[0], nearestB[1] - nearestA[1]];

            const vecIntersec = [intersection[0] - nearestA[0], intersection[1] - nearestA[1]];
            const det = vecIntersec[0] * vecArc[1] - vecIntersec[1] * vecArc[0];
            app.tapLayer.arrow(nearestA[0], nearestA[1], nearestB[0], nearestB[1])
              .stroke("black")
              .strokeWidth(0.01)
              .curve(det < 0 ? 0.3 : -0.3);
          } else {
            app.tapLayer.line(nearestA[0], nearestA[1], nearestB[0], nearestB[1])
              .stroke("black")
              .strokeWidth(0.01);
          }
          // app.tapLayer.line(nearestA[0], nearestA[1], mouse[0], mouse[1]);
        }
          break;
        case "pleat": {
          // const normalized = RabbitEar.math.normalize(mouse.drag);
          const start = RabbitEar.vector(mouse.pressed);
          const step = RabbitEar.vector(mouse.drag).scale(1/12);
          const right = RabbitEar.vector(mouse.drag).scale(1/12).rotateZ270();
          const points = Array.from(Array(13))
            .map((_, i) => start.add(step.scale(i)).add(i%2===1 ? right : [0, 0]));
          app.tapLayer.polyline(points)
            .stroke("black")
            .fill("none")
            .strokeWidth(0.01);
        }
          break;
        case "perpendicular-to": {
          const nearEdge = app.nearestPressed.edge.index;
          const g = app.origami;
          const nearEdgeV0 = g.vertices_coords[g.edges_vertices[nearEdge][0]];
          const nearEdgeV1 = g.vertices_coords[g.edges_vertices[nearEdge][1]];
          const nearEdgeVec = [
            nearEdgeV1[0] - nearEdgeV0[0],
            nearEdgeV1[1] - nearEdgeV0[1]
          ];
          const nearestA = RabbitEar.math.nearest_point_on_line(
            nearEdgeV0,
            nearEdgeVec,
            mouse,
            (x => x)
          );

          app.tapLayer.line(nearestA[0], nearestA[1], mouse[0], mouse[1])
            .stroke("black")
            .strokeWidth(0.01);
        }
          break;
        case "rabbit-ear": break;
        case "kawasaki": break;
        case "mountain-valley": break;
        case "mark": break;
        case "cut": break;
        case "remove-crease":
          app.tapLayer.rect(...app.dragRect)
            .fill("none")
            .stroke("black")
            .strokeWidth(0.005)
            .strokeDasharray("0.02 0.008");
          break;
        case "select": break;
        case "view": break;
        case "graph": break;
        case "history": break;
        case "version": break;
        default: console.warn("need to implement " + app.tapMode);
      }
    }
    const nVertexI = app.nearest.vertex ? app.nearest.vertex.index : "";
    const nEdgeI = app.nearest.edge ? app.nearest.edge.index : "";
    const nFaceI = app.nearest.face ? app.nearest.face.index : "";
    const nSectorI = app.nearest.sector ? app.nearest.sector.index : "";
    document.querySelectorAll(".app-info-p")[0].innerHTML = "<b>cursor</b><br>x: "+(mouse.x).toFixed(3)+"<br>y: "+(mouse.y).toFixed(3)+"<br><br><b>nearest</b><br>point [" + nVertexI + "]<br>edge [" + nEdgeI + "]<br>face [" + nFaceI + "]";


    switch (app.tapMode) {
      case "segment":
      case "point-to-point":
        if (app.nearest.vertex) {
          app.tapLayer.circle(app.nearest.vertex.coords[0], app.nearest.vertex.coords[1], 0.01).fill("#e53");
        }
        break;
      case "rabbit-ear":
      case "kawasaki":
        if (app.nearest.face && app.nearest.face.svg) {
          app.nearest.face.svg.setAttribute("style", "fill:#ec3;");
        }
        break;
      case "bisect":
      case "pleat":
      case "mountain-valley":
      case "mark":
      case "cut":
        if (app.nearest.edge && app.nearest.edge.svg) {
          app.nearest.edge.svg.setAttribute("style", "stroke:#ec3;");
        }
        break;
      case "perpendicular-to":
        if (mouse.isPressed) {
          if (app.nearest.vertex && app.nearestPressed.edge && app.nearestPressed.edge.svg) {
            app.nearestPressed.edge.svg.setAttribute("style", "stroke:#ec3;");
          }
          app.tapLayer.circle(app.nearest.vertex.coords[0], app.nearest.vertex.coords[1], 0.01).fill("#e53");
        } else {
          if (app.nearest.edge && app.nearest.edge.svg) {
            app.nearest.edge.svg.setAttribute("style", "stroke:#ec3;");
          }
        }
        break;
      case "remove-crease":
        app.tapLayer.rect(...app.dragRect)
          .fill("none")
          .stroke("black")
          .strokeWidth(0.005)
          .strokeDasharray("0.02 0.008");
        if (app.nearest.edge && app.nearest.edge.svg) {
          app.nearest.edge.svg.setAttribute("style", "stroke:#ec3;");
        }
        break;
      case "select":
        app.tapLayer.rect(...app.dragRect)
          .fill("#0001")
          .stroke("black")
          .strokeWidth(0.005)
          .strokeDasharray("0.016 0.008");
        break;
      case "view": break;
      case "graph": break;
      case "history": break;
      case "version": break;
      default: console.warn("need to implement " + app.tapMode);
    }
  };
};
