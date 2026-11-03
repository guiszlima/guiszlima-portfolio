import { readFile } from 'node:fs/promises';
import Ajv from 'ajv/dist/2020.js'; import addFormats from 'ajv-formats';
const [schema, content] = await Promise.all(['src/data/portfolio.schema.json', 'src/data/portfolio.json'].map(async path => JSON.parse(await readFile(path, 'utf8'))));
const ajv = new Ajv({ allErrors: true, strict: false }); addFormats(ajv);
const valid = ajv.validate(schema, content); if (!valid) throw new Error(ajv.errorsText());
const unique = (list, label) => { const ids = list.map(item => item.id); if (new Set(ids).size !== ids.length) throw new Error(`Duplicate ${label} IDs`); };
unique(content.projects, 'project'); unique(content.skills, 'skill'); unique(content.experience, 'experience');
const skillIds = new Set(content.skills.map(skill => skill.id)); for (const project of content.projects) for (const technology of project.technologies) if (!skillIds.has(technology)) throw new Error(`Unknown technology '${technology}' in ${project.id}`);
console.log(`Content valid · ${content.projects.length} projects · schema ${content.meta.schemaVersion}`);
