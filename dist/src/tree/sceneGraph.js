var SceneGraph = /** @class */ (function () {
    function SceneGraph() {
        this.root = new Piece();
    }
    SceneGraph.prototype.drawPieces = function () {
        function drawPiece(piece) {
            piece.draw();
            piece.children.forEach(drawPiece);
        }
    };
    return SceneGraph;
}());
