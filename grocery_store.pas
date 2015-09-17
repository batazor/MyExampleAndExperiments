{ Grocery Store }
PROGRAM Grocery(INPUT, OUTPUT);

VAR
  Change, TotalPrice,
  Dollars, Quarters, Dimes, Nickels, Cents :INTEGER;

BEGIN
  WRITE('Enter the total-price in cents: ');
  READLN(TotalPrice);

  Change := 100 - TotalPrice;
  { Quarters }
    Quarters := Change DIV 25;
    Change := Change MOD 25;
  { Dimes }
    Dimes := Change DIV 10;
    Change := Change MOD 10;
  { Nickels }
    Nickels := Change DIV 5;
    Change := Change MOD 5;
  { Cents }
    Cents := Change;
  WRITELN('The change is:');
  WRITELN(Quarters, ' Quarters');
  WRITELN(Dimes, ' Dimes');
  WRITELN(Nickels, ' Nickels');
  WRITELN(Cents, ' Cents');
END.