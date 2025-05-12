FROM alpine:3

# RUN INSTRUCTIONS
# RUN <command> [<arg1> <arg2> ...]
# RUN <command> [<param1>=<value1> <param2>=<value2> ...]

RUN mkdir /app
RUN echo "Hello World"
RUN echo "Hello World" > /app/hello.txt
RUN cat /app/hello.txt

# Command Instructions
# a command to run when a container is started from the image, not when building the image
# CMD <command> [<arg1> <arg2> ...]
# CMD <command> [<param1>=<value1> <param2>=<value2> ...]
# CMD ["executable","param1","param2"]
# CMD ["executable", "param1", "param2"]
# CMD ["echo", "Hello World"]
# CMD ["echo", "Hello World"]

# lABEL INSTRUCTIONS
# LABEL <key>=<value> <key>=<value> ...
LABEL version="1.0" maintainer="john" description="This is a test image"


# ADD INSTRUCTIONS
# ADD <src>... <dest>
# Pattern matching
# For add all files matching a pattern, use the wildcard *.

RUN mkdir /app/addCommand
ADD txt/*.txt /app/addCommand/
#   

# COPY INSTRUCTIONS
# COPY <src>... <dest>
# Pattern matching
# For copy all files matching a pattern, use the wildcard *.
RUN mkdir /app/copyCommand
COPY txt/*.txt /app/copyCommand/
CMD cat /app/copyCommand/txt1.txt
