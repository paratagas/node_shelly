process.stdin.setEncoding('utf8');
console.log("Welcome...");
console.log();

process.stdin.on('readable', function() {
   var input = process.stdin.read();

   if (input !== null) {
      // echo the text
      process.stdout.write("> " + input);

      var command = input.trim();
      if (command == 'exit')
         process.exit(0);

   }
});
