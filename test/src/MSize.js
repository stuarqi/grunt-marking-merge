function MSize(width, height) {
    this.width = width;
    this.height = height;
}

MSize.prototype.getArea = function () {
    return this.width * this.height;
};