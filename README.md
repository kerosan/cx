# cx

A lightweight utility for conditionally combining CSS class names. Perfect for dynamic styling in React, Vue, or any JavaScript project.

## Installation

```bash
npm install @kerosan/cx
```

## Usage

### Basic Example

```typescript
import { cx } from '@kerosan/cx';

const className = cx('btn', 'btn-primary');
console.log(className); // 'btn btn-primary'
```

### With Conditional Classes

```typescript
import { cx } from '@kerosan/cx';

const isActive = true;
const isDisabled = false;

const buttonClass = cx(
  'btn',
  isActive && 'btn-active',
  isDisabled && 'btn-disabled'
);

console.log(buttonClass); // 'btn btn-active'
```

### With Objects

```typescript
import { cx } from '@kerosan/cx';

const state = {
  'btn-primary': true,
  'btn-large': true,
  'btn-disabled': false
};

const className = cx('btn', state);
console.log(className); // 'btn btn-primary btn-large'
```

### With Arrays

```typescript
import { cx } from '@kerosan/cx';

const baseClasses = ['btn', 'btn-primary'];
const conditionalClasses = [true && 'btn-active', false && 'btn-disabled'];

const className = cx(baseClasses, conditionalClasses);
console.log(className); // 'btn btn-primary btn-active'
```

### Mixed Types

```typescript
import { cx } from '@kerosan/cx';

const isActive = true;
const size = 'large';

const className = cx(
  'button',
  'button-base',
  isActive && 'is-active',
  {
    'button-large': size === 'large',
    'button-small': size === 'small'
  },
  ['extra-class', false && 'hidden']
);

console.log(className); // 'button button-base is-active button-large extra-class'
```

### React Example

```typescript
import { cx } from '@kerosan/cx';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

function Button({ variant = 'primary', disabled = false, className }: ButtonProps) {
  return (
    <button
      className={cx(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-disabled': disabled
        },
        className
      )}
      disabled={disabled}
    >
      Click me
    </button>
  );
}
```

## API

### `cx(...classes: ClassArgument[]): string`

Combines multiple class values into a single space-separated string.

#### Parameters

- `...classes` - Variable number of arguments, each can be:
  - `string` - CSS class name (empty strings are filtered out)
  - `boolean` - If falsy, ignored; if truthy, ignored (used for conditional rendering)
  - `null | undefined` - Ignored
  - `Array` - Recursively processed; falsy values removed
  - `Record<string, any>` - Object with class names as keys and boolean values; only keys with truthy values are included

#### Returns

- `string` - Space-separated CSS class names

#### Example

```typescript
import { cx } from '@kerosan/cx';

cx('class1', 'class2');                             // 'class1 class2'
cx('class1', true && 'class2');                     // 'class1 class2'
cx('class1', false && 'class2');                    // 'class1'
cx('class1', null, undefined);                      // 'class1'
cx('class1', ['class2', 'class3']);                 // 'class1 class2 class3'
cx('class1', { 'class2': true, 'class3': false });  // 'class1 class2'
cx(['class1', null, 'class2']);                     // 'class1 class2'
```

## Why Use cx?

- **Lightweight** - No external dependencies
- **Type-safe** - Full TypeScript support
- **Flexible** - Supports strings, objects, arrays, and conditional expressions
- **Tree-shakeable** - Modern ES module format
- **Fast** - Efficient filtering and combining

## License

MIT © kerosan

## Repository

https://github.com/kerosan/cx
