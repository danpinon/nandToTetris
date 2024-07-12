
      // push constant 111
      @111 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 333
      @333 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 888
      @888 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
    // pop static.8 8
    @static.8
    D=A

    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    
    // pop static.3 3
    @static.3
    D=A

    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    
    // pop static.1 1
    @static.1
    D=A

    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    
    // push static.3 3
    @static.3
    D=M
    
    @SP
    A=M
    M=D
    @SP
    M=M+1
    
    // push static.1 1
    @static.1
    D=M
    
    @SP
    A=M
    M=D
    @SP
    M=M+1
    
    // sub
    @SP
    AM=M-1
    D=M
    A=A-1
    M=M-D
    
    // push static.8 8
    @static.8
    D=M
    
    @SP
    A=M
    M=D
    @SP
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
    