// Define what collections I have
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({ /* ... */});
const photography = defineCollection({ /* ... */});
const posts = defineCollection({ /* ... */});

export const collections = {projects, photography, posts}