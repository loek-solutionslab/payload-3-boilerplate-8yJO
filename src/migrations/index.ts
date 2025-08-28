import * as migration_20250828_160000_mark_existing_migrations from './20250828_160000_mark_existing_migrations';
import * as migration_20241125_222020_initial from './20241125_222020_initial';
import * as migration_20241214_124128 from './20241214_124128';
import * as migration_20250827_075203_new_collections from './20250827_075203_new_collections';
import * as migration_20250827_105215_course_archive_block from './20250827_105215_course_archive_block';
import * as migration_20250827_115355_add_background_colors from './20250827_115355_add_background_colors';
import * as migration_20250827_220932_add_header_nav_description from './20250827_220932_add_header_nav_description';
import * as migration_20250828_154558_remove_hero_system from './20250828_154558_remove_hero_system';

export const migrations = [
  {
    up: migration_20250828_160000_mark_existing_migrations.up,
    down: migration_20250828_160000_mark_existing_migrations.down,
    name: '20250828_160000_mark_existing_migrations',
  },
  {
    up: migration_20241125_222020_initial.up,
    down: migration_20241125_222020_initial.down,
    name: '20241125_222020_initial',
  },
  {
    up: migration_20241214_124128.up,
    down: migration_20241214_124128.down,
    name: '20241214_124128',
  },
  {
    up: migration_20250827_075203_new_collections.up,
    down: migration_20250827_075203_new_collections.down,
    name: '20250827_075203_new_collections',
  },
  {
    up: migration_20250827_105215_course_archive_block.up,
    down: migration_20250827_105215_course_archive_block.down,
    name: '20250827_105215_course_archive_block',
  },
  {
    up: migration_20250827_115355_add_background_colors.up,
    down: migration_20250827_115355_add_background_colors.down,
    name: '20250827_115355_add_background_colors'
  },
  {
    up: migration_20250827_220932_add_header_nav_description.up,
    down: migration_20250827_220932_add_header_nav_description.down,
    name: '20250827_220932_add_header_nav_description'
  },
  {
    up: migration_20250828_154558_remove_hero_system.up,
    down: migration_20250828_154558_remove_hero_system.down,
    name: '20250828_154558_remove_hero_system'
  },
];