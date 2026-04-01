const fs = require('fs');
['landing1.html', 'landing2.html', 'landing3.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<style>[\s\S]*?<\/style>\s*/, '');
    fs.writeFileSync(file, content);
});
console.log('Styles removed');
