// GitHub Pages는 없는 주소에 404.html을 준다. 주소로 바로 들어와도 화면이 뜨게 index.html을 복사한다
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
