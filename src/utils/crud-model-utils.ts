import { camelize } from '@angular-devkit/core/src/utils/strings';


export function takeRelativePropertyPath(absolutePropertyPath: string): string {
  const absolutePropertyPathArr = absolutePropertyPath.split('.');
  const relativePropertyPathArr = absolutePropertyPathArr.splice(
    1,
    absolutePropertyPathArr.length - 1
  );
  return relativePropertyPathArr.join('.');
}

/**
 Returns the plural form of a string
 ```javascript
 'innerHTML'.pluralize()         // 'InnerHTMLs'
 'action_name'.pluralize()       // 'actionNames'
 'css-class-name'.pluralize()    // 'cssClassNames'
 'regex'.pluralize()            // 'regexes'
 'user'.pluralize()             // 'users'
 ```
 */
export function pluralize(str: string): string {
  return camelize(
    [/([^aeiou])y$/, /()fe?$/, /([^aeiou]o|[sxz]|[cs]h)$/].map(
      (c, i) => (str = str.replace(c, `$1${'iv'[i] || ''}e`))
    ) && str + 's'
  );
}
