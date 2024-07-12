
      // push constant 3030
      @3030 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
    // pop THIS 0
    @THIS
    D=A

    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    
      // push constant 3040
      @3040 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
    // pop THAT 1
    @THAT
    D=A

    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    
      // push constant 32
      @32 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
    // pop THIS 2
    @THIS
    D=M
@2
D=D+A

    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    
      // push constant 46
      @46 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
    // pop THAT 6
    @THAT
    D=M
@6
D=D+A

    @R13
    M=D
    @SP
    AM=M-1
    D=M
    @R13
    A=M
    M=D
    
    // push THIS 0
    @THIS
    D=M
    
    @SP
    A=M
    M=D
    @SP
    M=M+1
    
    // push THAT 1
    @THAT
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
    
    // push THIS 2
    @THIS
    D=M
    @2
A=D+A
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
    
    // push THAT 6
    @THAT
    D=M
    @6
A=D+A
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
    