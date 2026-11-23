name: read-content
description: A skill that reads and returns the content of a specified file.
inputs:

- name: file_path
  type: string
  description: The path to the file whose content needs to be read.
  outputs:
- name: content
  type: string
  description: The content of the specified file.
