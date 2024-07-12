
      // push constant 150
      @150 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 150
      @150 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
    // add
    @SP //SP--
    M=M-1

    @SP // D=RAM[256]
    A=M // address=256
    D=M //D=RAM[256]

    A=A-1 //256-1
    D=D+M //D=RAM[256]+RAM[255]

    M=D //RAM[255]=D
    
    // pop static.0 0
    @static.0
    D=A

    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    
    // push static.0 0
    @static.0
    D=M
    
    @SP
    A=M
    M=D
    @SP
    M=M+1
    