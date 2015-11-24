PROGRAM task_one;
USES Math;
VAR
  x, y, n, sum : real;
BEGIN
  Writeln('Enter "x": ');
  Read(x);
  Writeln('Enter "y": ');
  Read(y);
  Writeln('Enter "n": ');
  Read(n);

  sum := power(sin(power(x, n) + power(x, 1/n)) + power(exp(power( x, 4 )) / cos(y), 1/3 ), 1/5 );

  Writeln('Result: ', sum);

  Readln();
END.
