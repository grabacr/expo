import semver from 'semver';
import CodedError from './CodedError';

const postedWarnings: { [key: string]: boolean } = {};

/**
 * Used for deprecating values and throwing an error if a given version of Expo has passed.
 */
export default function warnDeprecated(
  library: string,
  deprecatedAPI: string,
  options: {
    replacement?: string;
    currentVersion?: string;
    versionToRemove?: string;
  } = {}
): void {
  const { currentVersion, versionToRemove, replacement } = options;
  const code = codeFromLibrary(library);
  const key = `${code}:${deprecatedAPI}:${replacement}`;
  if (!postedWarnings[key]) {
    postedWarnings[key] = true;
  }

  if (!currentVersion || !versionToRemove || !semver.gte(versionToRemove, currentVersion)) {
    let message = `\`${deprecatedAPI}\` has been removed`;
    if (versionToRemove) {
      message = `${message} as of version "${versionToRemove}"`;
    }
    if (replacement && replacement.length) {
      message = `${message} please migrate to: \`${replacement}\``;
    }

    throw new CodedError(`ERR_DEPRECATED_API_${code}`, prependLibrary(library, message));
  }

  let message = `\`${deprecatedAPI}\` has been deprecated`;
  if (replacement && replacement.length) {
    message = `${message} in favor of \`${replacement}\``;
  }
  if (versionToRemove && versionToRemove.length) {
    message = `${message} and will be removed in version "${versionToRemove}"`;
  }
  console.warn(prependLibrary(library, message));
}

function prependLibrary(library: string, message: string): string {
  return `${library}: ${message}`;
}

/**
 * Transform format:
 * Expo.AR -> EXPO_AR
 * expo-ar -> EXPO_AR
 */
function codeFromLibrary(library: string): string {
  const code = library
    .replace(/-/g, '_')
    .replace(/\./g, '_')
    .toUpperCase();
  return code;
}
