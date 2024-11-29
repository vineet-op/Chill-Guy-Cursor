import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        postcss({
            config: {
                path: './postcss.config.js'
            },
            extensions: ['.css'],
            minimize: true,
            inject: {
                insertAt: 'top'
            }
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        })
    ],
    external: ['react', 'react-dom']
}; 