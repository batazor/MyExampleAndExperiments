PROGRAM task_two_one;
USES math, crt;
CONST PI = 3.1415;
VAR
  currentFunc : string[3];
  angle : real;
BEGIN
  Writeln('Enter type trigonometric function (sin, cos, tan, ctg) : ');
  Read(currentFunc);

  Writeln('Enter angle: ');
  Read(angle);

  angle := angle * (PI/180);

  if currentFunc = 'sin' then
    Writeln(currentFunc, ' (', angle:4:5, ' ): ', sin(angle):4:5)
  else
    if currentFunc = 'cos' then
      Writeln(currentFunc, ' (', angle:4:5, ' ): ', cos(angle):4:5)
    else
      if currentFunc = 'tan' then
        Writeln(currentFunc, ' (', angle:4:5, ' ): ', tan(angle):4:5)
      else
        if currentFunc = 'ctg' then
          Writeln(currentFunc, ' (', angle:4:5, ' ): ', (cos(angle)/sin(angle)):4:5)
        else
          Writeln('Not found trigonometric function ', currentFunc, '. Use function: sin, cos, tan, ctg.')

END.
