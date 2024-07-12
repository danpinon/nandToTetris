# Makefile to create VMTranslator executable
FILE := VMTranslator

VMTranslator: clear
	touch $(FILE)
	@echo "#!/bin/bash" >> $(FILE)
	@echo 'node VMTranslator.js "$$@"' >> $(FILE)
	chmod +x VMTranslator

clear:
	rm -rf VMTranslator.sh