const file = Bun.file("index.tsx");
const fileContent = await file.text();
console.log("File content:", fileContent);

Bun.write("output.txt", fileContent)
