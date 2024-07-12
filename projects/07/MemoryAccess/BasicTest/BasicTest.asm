
      // push constant 10
      @10 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 21
      @21 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 22
      @22 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 36
      @36 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 42
      @42 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 45
      @45 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
      // push constant 510
      @510 // D=i
      D=A
      @SP // *SP=D // RAM[*SP] = i
      A=M
      M=D 
      @SP //sp++ // RAM[0] = RAM[0] + 1
      M=M+1
      
    // push local 0
    @0 //D=index
    D=A
    @LCL
    A=D+A // @segment + @index
    D=M
    @SP // *SP=D // RAM[*SP] = RAM[segment + index]
    A=M
    M=D 
    @SP //sp++ // RAM[0] = RAM[0] + 1
    M=M+1
    
    // push that 5
    @5 //D=index
    D=A
    @THAT
    A=D+A // @segment + @index
    D=M
    @SP // *SP=D // RAM[*SP] = RAM[segment + index]
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

    A=A+1 //clean
    M=0
    
    // push argument 1
    @1 //D=index
    D=A
    @ARG
    A=D+A // @segment + @index
    D=M
    @SP // *SP=D // RAM[*SP] = RAM[segment + index]
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
    D=D-M //D=RAM[256]-RAM[255]

    M=D //RAM[255]=D

    A=A+1 //clean
    M=0
    
    // push this 6
    @6 //D=index
    D=A
    @THIS
    A=D+A // @segment + @index
    D=M
    @SP // *SP=D // RAM[*SP] = RAM[segment + index]
    A=M
    M=D 
    @SP //sp++ // RAM[0] = RAM[0] + 1
    M=M+1
    
    // push this 6
    @6 //D=index
    D=A
    @THIS
    A=D+A // @segment + @index
    D=M
    @SP // *SP=D // RAM[*SP] = RAM[segment + index]
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

    A=A+1 //clean
    M=0
    
    // add
    @SP //SP--
    M=M-1

    @SP // D=RAM[256]
    A=M // address=256
    D=M //D=RAM[256]

    A=A-1 //256-1
    D=D-M //D=RAM[256]-RAM[255]

    M=D //RAM[255]=D

    A=A+1 //clean
    M=0
    
    // push temp 6
    @6 //D=index
    D=A
    @5
    A=D+A // @segment + @index
    D=M
    @SP // *SP=D // RAM[*SP] = RAM[segment + index]
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

    A=A+1 //clean
    M=0
    