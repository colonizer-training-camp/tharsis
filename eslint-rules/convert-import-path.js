import path from 'path';

const projectRoot = path.resolve('./');
const aliasPrefix = '@';
const srcRoot = path.join(projectRoot, 'src'); // 실제 src 위치
const externalModulePattern = /^([a-z@][\w@/.-]*)$/;

function normalizeImportPath(filePath, importPath) {
  const fileDir = path.dirname(filePath);

  if (externalModulePattern.test(importPath)) return importPath;

  let absImport;
  if (importPath.startsWith('.')) {
    absImport = path.resolve(fileDir, importPath);
  } else if (importPath.startsWith(aliasPrefix)) {
    absImport = path.resolve(projectRoot, 'src', importPath.slice(aliasPrefix.length + 1));
  } else {
    absImport = path.resolve(projectRoot, '.' + importPath);
  }

  let relativePath = path.relative(fileDir, absImport).replace(/\\/g, '/');
  if (!relativePath.startsWith('..')) {
    relativePath = relativePath.startsWith('.') ? relativePath : './' + relativePath;
    return relativePath;
  }

  if (absImport.startsWith(srcRoot)) {
    const relativeToSrc = path.relative(srcRoot, absImport).replace(/\\/g, '/');
    return `${aliasPrefix}/${relativeToSrc}`;
  }

  const absFromRoot = path.relative(projectRoot, absImport).replace(/\\/g, '/');
  return '/' + absFromRoot;
}

export default {
  rules: {
    'convert-import-path': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Normalize import paths',
          category: 'Stylistic Issues',
          recommended: false,
        },
        fixable: 'code',
      },
      create(context) {
        const filePath = context.getFilename();

        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const normalized = normalizeImportPath(filePath, importPath);
            if (normalized !== importPath) {
              context.report({
                node: node.source,
                message: `Import path should be "${normalized}"`,
                fix: (fixer) => fixer.replaceText(node.source, `"${normalized}"`),
              });
            }
          },
          CallExpression(node) {
            if (node.callee.name === 'require' && node.arguments.length === 1) {
              const arg = node.arguments[0];
              if (arg.type === 'Literal' && typeof arg.value === 'string') {
                const importPath = arg.value;
                const normalized = normalizeImportPath(filePath, importPath);
                if (normalized !== importPath) {
                  context.report({
                    node: arg,
                    message: `Import path should be "${normalized}"`,
                    fix: (fixer) => fixer.replaceText(arg, `"${normalized}"`),
                  });
                }
              }
            }
          },
        };
      },
    },
  },
};
