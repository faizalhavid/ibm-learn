name: formater
description: A skill that formats text according to specified rules, such as capitalization, punctuation, and spacing.
inputs:

- name: text
  type: string
  description: The input text to be formatted.
- name: rules
  type: object
  description: A set of formatting rules to apply to the input text. This may include options for capitalization, punctuation, spacing, and other text transformations.
  outputs:
- name: formatted_text
  type: string
  description: The formatted text after applying the specified rules.
  examples:
- input:
  text: "hello world! this is a test."
  rules:
  capitalization: "sentence"
  punctuation: "standard"
  spacing: "single"
  output:
  formatted_text: "Hello world! This is a test."
