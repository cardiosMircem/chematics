/* eslint-disable no-param-reassign */
import {
  apply,
  branchAndMerge,
  chain,
  FileEntry,
  forEach,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { strings as stringUtils } from '@angular-devkit/core';
import * as crudModelUtils from '../utils/crud-model-utils';
import { MenuOptions } from './schema';
import { getWorkspace } from '@schematics/angular/utility/config';
import { findModuleFromOptions } from 'schematics-utilities';

function takeName(path: string) {
  const pathArr = path.split('/');
  return pathArr[pathArr.length - 1];
}

function takeRealPath(path: string) {
  const pathArr = path.split('/');
  pathArr.splice(pathArr.length - 1, 1);
  return pathArr.join('/');
}

/**
 * setting the folder, name, and take the configuration object
 * @param options options passed by the developer
 * @param host host from where the schematics has been called
 */
function setupOptions(options: MenuOptions, host: Tree): void {
  // reading the info contained in the angular.json file of the application
  // that is calling the schematic
  const workspace = getWorkspace(host);

  console.log(workspace);

  options.project = Object.keys(workspace.projects)[0];

  // if the --path is not provided when calling a schematic, throw an error
  if (options.path === undefined) {
    throw new SchematicsException(`--path variable is mandatory for generating the login page`);
  }

  // retrieve the name from the path
  options.name = takeName(options.path);
  // real path present in the application
  options.path = takeRealPath(options.path);
} // setupOptions

/**
 * Landing function on the init of the schematics
 *
 * @param options options passed by the developer
 * @returns the schematic
 */
export default function (options: MenuOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    // setting the name, the correct path
    setupOptions(options, host);
    options.module = findModuleFromOptions(host, options) || '';

    // create the files in this schematic and place them in the correct folder
    const templateSource = apply(url('./files'), [
      template({
        ...stringUtils,
        ...options,
        ...(crudModelUtils as any)
      }),
      move(`${options.path}/${options.name}` || ''),
      // fix for https://github.com/angular/angular-cli/issues/11337
      forEach((fileEntry: FileEntry) => {
        if (host.exists(fileEntry.path)) {
          host.overwrite(fileEntry.path, fileEntry.content);
        }
        return fileEntry;
      })
    ]);

    // honestly do not know
    const rule = chain([
      branchAndMerge(chain([mergeWith(templateSource, MergeStrategy.Overwrite)]))
    ]);

    return rule(host, context);
  };
}
