(LOOP)
  @KBD
  D=M
  @FILL
  D;JGT

(CLEAR)
  @offset
  D=M
  @SCREEN
  A=D+A
  M=0

  @INCREMENT
  0;JMP

(FILL)
  @offset
  D=M
  @SCREEN
  A=D+A
  M=-1

(INCREMENT)
  @offset
  MD=M+1
  @8192
  D=D-A

  @LOOP
  D;JNE

(RESET_OFFSET)
  @offset
  M=0
  @LOOP
  0;JMP
