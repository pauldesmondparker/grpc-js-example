# Simple @grpc Example

Last Update: 20230823

> [!Note]
> Based on https://www.youtube.com/watch?v=iq2z7xw8VmE

## Setup

> [!Note]
> This repository does not include **ANY** code that can be generated. Therefore, for the example
> to work, you must first generate the grpc ts files with `pnpm proto:gen`.

> [!Warning]
> Adding new files to the `proto/` directory will not show up in unstaged files, you'll need to
> `git add -f proto/new.proto` to force add a new hypothetical proto file.

> [!Important]
> Do **NOT** add any generated files in the `proto/` directory. They are ignored for a reason.
> As a rule of thumb, do not add any `.ts` files in this directory.

```bash
# Install all dependencies
pnpm i
# Generate all ts files from proto/*.proto
pnpm proto:gen
```

## Execution

```bash
pnpm startserver  # Use a separate pane/window
pnpm startclient
```

## Notes

### tsconfig.json

> [!Note]
> Notice that there's no tsconfig file. For some reason, at present, ts-node doesn't work with
> any setup that I tried. Ref: https://github.com/TypeStrong/ts-node/issues/1007

> [!Note]
> Using `ts-node` with no `tsconfig.json` works with no issue.
