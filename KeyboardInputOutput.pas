PROGRAM KeyboardInput(OUTPUT);

{ Constant Declarations }
CONST
  Pi = 3.14159;

{ Variable Declarations }
VAR
  Perimeter, Radius :REAL;
  RoundedPerimetr, TruncatedPErimeter :INTEGER;

{ Program Block }
BEGIN
  WRITE('Please enter the radius:');
  READLN(Radius);

  Perimeter := 2*Pi*Radius;
  RoundedPerimetr := ROUND(Perimeter);
  TruncatedPerimeter := TRUNC(Perimeter);

  WRITELN('Perimeter=', Perimeter);
  WRITELN('Perimeter (rounded)=', RoundedPerimeter);
  WRITELN('Perimeter (truncated)=', TruncatedPerimeter);
END.