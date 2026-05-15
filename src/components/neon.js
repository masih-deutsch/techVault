import { neon } from '@neondatabase/serverless';


const sql = neon(process.env.DATABASE_URL);


export async function getLibs(query = "", sort = "") {

  const searchPattern = `%${query}%`;

  let libraries;
  if (sort === "asc") {
    libraries = await sql`
      SELECT * FROM libraries 
      WHERE name ILIKE ${searchPattern} OR description ILIKE ${searchPattern}
      ORDER BY id ASC
    `;
  } else if (sort === "des") {
    libraries = await sql`
      SELECT * FROM libraries 
      WHERE name ILIKE ${searchPattern} OR description ILIKE ${searchPattern}
      ORDER BY id DESC
    `;
  } else if (sort === "name") {
    libraries = await sql`
      SELECT * FROM libraries 
      WHERE name ILIKE ${searchPattern} OR description ILIKE ${searchPattern}
      ORDER BY LOWER(name) ASC
    `;
  } else {
    libraries = await sql`
      SELECT * FROM libraries 
      WHERE name ILIKE ${searchPattern} OR description ILIKE ${searchPattern}
      ORDER BY id ASC
    `;
  }


  return libraries.map(lib => ({
    id: lib.id,
    name: lib.name,
    category: lib.category,
    description: lib.description,
    installCommand: lib.installcommand,
    docsUrl: lib.docsurl,
    isBookmarked: lib.isbookmarked,
    personalNote: lib.personalnote
  }));
}



export async function createLib(data) {
  const newLib = await sql`
    INSERT INTO libraries (name, category, description, installCommand, docsUrl, isBookmarked, personalNote)
    VALUES (${data.name}, ${data.category}, ${data.description}, ${data.installCommand}, ${data.docsUrl}, false, NULL)
    RETURNING *;
  `;
  return newLib[0];
}


export async function updateLib(data) {

  const updatedLib = await sql`
    UPDATE libraries
    SET 
      name = ${data.name},
      category = ${data.category},
      description = ${data.description},
      installCommand = ${data.installCommand},
      docsUrl = ${data.docsUrl},
      isBookmarked = ${data.isBookmarked},
      personalNote = ${data.personalNote ?? null}
    WHERE id = ${data.id}
    RETURNING *;
  `;
  return updatedLib[0];
}


export async function removeLib(id) {
  const deletedLib = await sql`
    DELETE FROM libraries
    WHERE id = ${id}
    RETURNING *;
  `;
  return deletedLib[0];
}