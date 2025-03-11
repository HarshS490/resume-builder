export const prompts = {
  summarize_repos: (repo_data: object) => `
    Below is a json dump of list of my repositories and their readme files. Summarize each one of them using their readme files and their repository names.

    ${JSON.stringify(repo_data)}
  `,
  jsonify_summarized_repos: (repo_data: string, schema_str: string) => `
    Below is a response. Format below in json format as an array of objects of schema:
    schema = ${schema_str}

    response =
    ${repo_data}
  `,
  deduce_job_description: (job_description: string) => `
    - What is the requirement in below mentioned job description ?
    - ANSWER IN PARAGRAPHS
    - If description is gibberish or irrelevent which might be possible due to user's error, return empty string.  

    ${job_description}
  `,
  select_repo_for_job_description: (
    repo_data: object,
    job_description: string,
    project_count: number
  ) => `
    Given below is json dump of the project titles and their descriptions. You have to select ${project_count} projects from above mentioned list which is relevant to the following job description. 
    
    # Job Description
    \`\`\`markdown
    ${job_description}
    \`\`\`

    # Repo Data
    \`\`\`json
    ${JSON.stringify(repo_data)}
    \`\`\`
    
    `,
    jsonify_selected_repo: (repo_dump: string, schema_str: string) => `
    Below is a response.Extract relevant data and format in json format as an array of objects of schema: ${schema_str}
    
    Only return the json output. Do not add any other text

    \`\`\`markdown
    ${repo_dump}
    \`\`\`
  `,
  generate_resume_points: (repo_data: object, count: number = 5) => `
    I want to create bullet points for resume and below are the list of projects with their brief descriptions. 
    - Generate bullet points for each of the projects and include metrics for them. If metrics are not present, fake them.
    - Keep bullet point count limited to ${count} points.
    
    \`\`\`json
    ${JSON.stringify(repo_data)}
    \`\`\`
  `,
  jsonify_resume_points: (repo_dump: string, schema_str: string) => `
    Below is a response. Extract relevant details and format as an array of json object of schema: ${schema_str}

    \`\`\`markdown
    ${repo_dump}
    \`\`\`
  `
};
