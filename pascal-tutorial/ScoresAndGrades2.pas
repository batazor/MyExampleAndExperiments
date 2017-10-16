PROGRAM ScoresAndGrades2(INPUT,OUTPUT);

VAR
  Score         :INTEGER;
  A, B, C, D, F :BOOLEAN;

BEGIN
  WRITE('Please enter the score:');
  READLN(Score);

  A := (Score >= 90) AND (Score <= 100);
  B := (Score >= 80) AND (Score < 90);
  C := (Score >= 70) AND (Score < 80);
  D := (Score >= 60) AND (Score < 70);
  F := (Score < 60) AND (Score >= 0);
  WRITELN;

  { Beginning of the IF construct }
  { ----------------------------- }
  IF A THEN
    WRITELN('Excellent. Your grade is ''A''')
  ELSE IF B THEN
    WRITELN('Very good. Your grade is ''B''')
  ELSE IF C THEN
    WRITELN('Good. Your grade is ''C''')
  ELSE IF D THEN
    WRITELN('Passed. Your grade is ''D''')
  ELSE IF F THEN
    WRITELN('Better luck next time. Your grade is ''F''')
  ELSE
    WRITELN('This number is out of range.');
  { End of the IF construct }
  { ----------------------- }
  WRITELN('Press ENTER to continue..');
  READLN
END.