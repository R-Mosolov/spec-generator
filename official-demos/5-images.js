"use strict";
// Example of how to add images to the document - You can use Buffers, UInt8Arrays or Base64 strings
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import Document from "docx";
// var docx_1 = require("docx");
import docx_1 from "docx";

const doc = new Document();

var image1 = docx_1.Media.addImage(doc, fs.readFileSync("./demo/images/image1.jpeg"));
var image2 = docx_1.Media.addImage(doc, fs.readFileSync("./demo/images/dog.png").toString("base64"));
var image3 = docx_1.Media.addImage(doc, fs.readFileSync("./demo/images/cat.jpg"));
var image4 = docx_1.Media.addImage(doc, fs.readFileSync("./demo/images/parrots.bmp"));
var image5 = docx_1.Media.addImage(doc, fs.readFileSync("./demo/images/pizza.gif"));
var image6 = docx_1.Media.addImage(doc, fs.readFileSync("./demo/images/pizza.gif"), 200, 200, {
    floating: {
        horizontalPosition: {
            offset: 1014400
        },
        verticalPosition: {
            offset: 1014400
        }
    }
});
var image7 = docx_1.Media.addImage(doc, fs.readFileSync("./demo/images/cat.jpg"), 200, 200, {
    floating: {
        horizontalPosition: {
            relative: docx_1.HorizontalPositionRelativeFrom.PAGE,
            align: docx_1.HorizontalPositionAlign.RIGHT
        },
        verticalPosition: {
            relative: docx_1.VerticalPositionRelativeFrom.PAGE,
            align: docx_1.VerticalPositionAlign.BOTTOM
        }
    }
});
doc.addSection({
    children: [
        new docx_1.Paragraph("Hello World"),
        new docx_1.Paragraph(image1),
        new docx_1.Paragraph(image2),
        new docx_1.Paragraph(image3),
        new docx_1.Paragraph(image4),
        new docx_1.Paragraph(image5),
        new docx_1.Paragraph(image6),
        new docx_1.Paragraph(image7),
    ]
});
docx_1.Packer.toBuffer(doc).then(function (buffer) {
    fs.writeFileSync("My Document.docx", buffer);
});
