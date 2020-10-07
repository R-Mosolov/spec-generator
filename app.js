// Simple example to add text to a document
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import pkg from "docx";
// import simpleImage from "./data/images/simple-image.png";
// import simpleImage2 from "./data/images/simple-image-2.jpg";
const { 
    Document, Packer, Paragraph, TextRun, 
    Table, TableRow, TableCell, 
    Header, Footer,
    Media
} = pkg;

const doc = new Document({
    numbering: {
      config: [
        {
          reference: "my-crazy-numbering",
          levels: [
            {
              level: 0,
              format: "upperRoman",
              text: "%1",
              style: {
                paragraph: {
                  indent: { left: 720, hanging: 260 }
                }
              }
            },
            {
              level: 1,
              format: "decimal",
              text: "%2.",
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 980 }
                }
              }
            },
            {
              level: 2,
              format: "lowerLetter",
              text: "%3)",
              style: {
                paragraph: {
                  indent: { left: 2160, hanging: 1700 }
                }
              }
            },
            {
              level: 3,
              format: "upperLetter",
              text: "%4)",
              style: {
                paragraph: {
                  indent: { left: 2880, hanging: 2420 }
                }
              }
            }
          ]
        }
      ]
    }
});

const image = pkg.Media.addImage(doc, fs.readFileSync("./data/images/simple-image-3.jpeg"));
const arr = [1, 2, 3];
const obj = [
    { name: "Roman", age: 25 },
    { name: "Ivan", age: 21 },
    { name: "Boris", age: 19 }
];

doc.addSection({
    headers: {
        default: new Header({
            children: [new Paragraph("Header text")],
        }),
    },
    footers: {
        default: new Footer({
            children: [new Paragraph("Footer text")],
        }),
    },
    properties: {},
    children: [
        new Paragraph({
            children: [
                new TextRun("Hello World"),
                new TextRun({
                    text: "Foo Bar",
                    bold: true,
                }),
                new TextRun({
                    text: "\tGithub is the best",
                    bold: true,
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph("hello")],
                                }),
                            ],
                        }),
                    ],
                })
            ],
        }),
        new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("hello")],
                        }),
                        new TableCell({
                            children: [new Paragraph("hello")],
                        }),
                        new TableCell({
                            children: [new Paragraph("hello")],
                        }),
                    ],
                }),
            ],
            width: {
                size: 10,
                type: "pct",
            }
        }),
        new Paragraph({
            text: "Bullet points",
            bullet: {
                level: 0, // How deep you want the bullet to me
            },
        }),
        new Paragraph({
            text: "Bullet points",
            bullet: {
                level: 1, // How deep you want the bullet to me
            },
        }),
        new Paragraph({
            text: "Bullet points",
            bullet: {
                level: 2, // How deep you want the bullet to me
            },
        }),
        new Paragraph({
            text: "Hey you",
            numbering: {
              reference: "my-crazy-numbering",
              level: 0
            }
          }),
          new Paragraph({
            text: "What's up fam",
            numbering: {
              reference: "my-crazy-numbering",
              level: 1
            }
          }),
          new Paragraph({
            text: "Hello World 2",
            numbering: {
              reference: "my-crazy-numbering",
              level: 1
            }
          }),
          new Paragraph({
            text: "Yeah boi",
            numbering: {
              reference: "my-crazy-numbering",
              level: 2
            }
          }),
          new Paragraph({
            text: "Hey you",
            bullet: {
              level: 0
            }
          }),
          new Paragraph({
            text: "What's up fam",
            bullet: {
              level: 1
            }
          }),
          new Paragraph({
            text: "Hello World 2",
            bullet: {
              level: 2
            }
          }),
          new Paragraph({
            text: "Yeah boi",
            bullet: {
              level: 3
            }
          }),
          new Paragraph({
            text: "101 MSXFM",
            numbering: {
              reference: "my-crazy-numbering",
              level: 3
            }
          }),
          new Paragraph({
            text: "back to level 1",
            numbering: {
              reference: "my-crazy-numbering",
              level: 1
            }
          }),
          new Paragraph({
            text: "back to level 0",
            numbering: {
              reference: "my-crazy-numbering",
              level: 0
            }
          }),
          new Paragraph(image),
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`./data/generated-specs/test-spec-${Date.now()}.docx`, buffer);
});