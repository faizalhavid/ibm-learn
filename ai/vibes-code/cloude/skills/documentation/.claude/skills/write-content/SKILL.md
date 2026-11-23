name: write-content
description: A skill that writes specified content to a file at a given path.
inputs:

- name: file_path
  type: string
  description: The path to the file where the content should be written.
- name: content
  type: string
  description: The content to be written to the specified file.
  outputs:
- name: success
  type: boolean
  description: Indicates whether the content was successfully written to the file.
  examples:
- input:
  file_path: "/path/to/file.txt"
  content: "This is the content to be written to the file."
  output:
  success: true
