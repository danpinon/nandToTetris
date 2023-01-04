(LISTEN)
@i
M=0 // set i to 0

@8191
D=A
@n
M=D // set n to the number of screen RAMs

@KBD
D=M //listen to the keyboard

@SET_PIXEL_BLACK
D;JGT // if keyboard is not idle set pixel to black

@pixel
M=0 // set pixel to white

@LOOP
0;JMP // jump to loop to not set pixel to black

(SET_PIXEL_BLACK)
@pixel
M=-1 // set pixel to black

(LOOP)
@i
D=M
@n
D=D-M
@LISTEN
D;JGT // go back to LISTEN if loop has ended
@pixel
D=M
@BLACKEN
D;JLT // go to BLACKEN if pixel is set to black

@i
D=M
@SCREEN
A=A+D //increment the address of the screen
M=0
@INCREMENT
0;JMP

(BLACKEN)
@i
D=M
@SCREEN
A=A+D
M=-1

(INCREMENT)
@i
M=M+1

@LOOP
0;JMP

@LISTEN
0;JMP
