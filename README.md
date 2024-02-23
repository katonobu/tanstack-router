# tanstack-router
## init
copy from [git hub router/examples/react/kitchen-sink-react-query-file-based/](https://github.com/TanStack/router/tree/main/examples/react/kitchen-sink-react-query-file-based)

## init_mentenance
### EMS明示
`npm run dev` すると、
`The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.`
が出る。
package.jsonに、
```
  "type": "module",
```
行を追加。
### tailwindoのインストール
ブラウザコンソールに下記警告が出る。
```
cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation
```
[Get started with Tailwind CSS](https://tailwindcss.com/docs/installation) を参考に修正。
#### Install Tailwind CSS
[Using ESM or TypeScript](https://tailwindcss.com/docs/configuration#using-esm-or-type-script)
`tailwindcss init`に--tsオプションを付ける。
```
npm install -D tailwindcss
npx tailwindcss init --ts
```

#### Configure your template paths
tailwind.config.ts
contentsの中身が空っぽなので適切なパスを指定する。
ts,tsxを追加する。
```
  content: ["./src/**/*.{html,js,ts,tsx}"],
```

#### Add the Tailwind directives to your CSS
`src/input.css`を新規作成
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Start the Tailwind CLI build process
参照する.cssファイルを作る
--watch を付けるとinput.cssの変化に応じてoutput.cssを作るらしいが、今回は--watchなしにしておく。
```
$ npx tailwindcss --help

tailwindcss v3.4.1

Usage:
   tailwindcss [--input input.css] [--output output.css] [--watch] [options...]
   tailwindcss init [--full] [--postcss] [options...]

Commands:
   init [options]

Options:
   -i, --input              Input file
   -o, --output             Output file
   -w, --watch              Watch for changes and rebuild as needed
   -p, --poll               Use polling instead of filesystem events when watching
       --content            Content paths to use for removing unused classes
       --postcss            Load custom PostCSS configuration
   -m, --minify             Minify the output
   -c, --config             Path to a custom config file
       --no-autoprefixer    Disable autoprefixer
   -h, --help               Display usage information

$ npx tailwindcss -i ./src/input.css -o ./src/output.css
```

#### 動作確認
- 5173ポートを開いてcssが当たってることを確認
- buildしてもcssが当たってることを確認
```
$ npm run build

> tanstack-router-react-example-kitchen-sink-react-query-file-based@0.0.0 build
> vite build


♻️  Generating routes...
✅ Processed routes in 992ms
vite v5.1.3 building for production...
✓ 200 modules transformed.
dist/index.html                       0.41 kB │ gzip:   0.27 kB
dist/assets/index-BhtsJyLr.css        9.23 kB │ gzip:   2.58 kB
dist/assets/index.lazy-jS0YFBSc.js    0.25 kB │ gzip:   0.22 kB
dist/assets/index-CkI-Wx_1.js       356.59 kB │ gzip: 111.24 kB
✓ built in 12.86s

$ npm run serve

> tanstack-router-react-example-kitchen-sink-react-query-file-based@0.0.0 serve
> vite preview


♻️  Generating routes...
✅ Processed routes in 1082ms
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```