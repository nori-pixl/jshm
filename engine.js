// 究極の共通メモリ（名前空間）
const jsMemory: Record<string, any> = { ...window };

class JSFullPowerEngine extends HTMLElement {
    async connectedCallback() {
        const tag = this.tagName.toLowerCase();
        const name = this.getAttribute('name');
        const val = this.getAttribute('val');
        const cond = this.getAttribute('cond');
        const match = this.getAttribute('match');
        const code = this.textContent || "";

        // --- 1. 【定義・メモリ管理系】 (閉じタグなし) ---
        if (tag === 'js-let' || tag === 'js-const') {
            jsMemory[name!] = this.safeEval(val);
        } else if (tag === 'js-delete') {
            delete jsMemory[name!];
        } else if (tag === 'js-export') {
            (window as any)[name!] = jsMemory[name!]; // 外部JSからアクセス可能にする
        }

        // --- 2. 【高度な制御構文系】 (閉じタグあり) ---
        else if (tag === 'js-for') {
            // 例: <js-for cond="let i=0; i<5; i++"> ... </js-for>
            const setup = cond?.split(';')[0] || "";
            const test = cond?.split(';')[1] || "true";
            const update = cond?.split(';')[2] || "";
            const loopRunner = new Function('vars', `with(vars){ for(${setup}; ${test}; ${update}){ ${code} } }`);
            loopRunner(jsMemory);
        } else if (tag === 'js-switch') {
            const target = this.safeEval(val);
            const cases = this.querySelectorAll('js-case');
            let matched = false;
            cases.forEach(c => {
                if (!matched && (c.getAttribute('match') === String(target) || c.hasAttribute('default'))) {
                    this.execute(c.textContent || "");
                    matched = true;
                }
            });
        }

        // --- 3. 【クラスと非同期系】 ---
        else if (tag === 'js-class') {
            const base = this.getAttribute('extends');
            const BaseClass = base ? jsMemory[base] : class {};
            jsMemory[name!] = class extends BaseClass {
                constructor(...args: any[]) {
                    super(...args);
                    const runner = new Function('self', 'vars', 'args', `with(vars){ ${code} }`);
                    runner(this, jsMemory, args);
                }
            };
        } else if (tag === 'js-async') {
            const AsyncFunc = Object.getPrototypeOf(async function(){}).constructor;
            await new AsyncFunc('vars', `with(vars){ ${code} }`)(jsMemory);
        }
// .jshm ファイルを読み込んで実行するメイン関数
async function loadJSHM(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`ファイルが見つかりません: ${url}`);
        
        const text = await response.text();
        
        // 1. 文字列をHTML要素に変換
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const bodyNodes = Array.from(doc.body.childNodes);

        // 2. 現在のページの好きな場所（例えばbody）に流し込む
        // これによりカスタム要素の connectedCallback が自動で起動します
        bodyNodes.forEach(node => {
            document.body.appendChild(node);
        });
        
        console.log(`[JSHM Loader] ${url} の読み込みと実行が完了しました。`);
    } catch (err) {
        console.error("[JSHM Loader] エラー:", err);
    }
}

// ページ読み込み時に特定の属性を持つタグがあれば自動実行
// 例: <script type="application/jshm" src="main.jshm"></script>
window.addEventListener('DOMContentLoaded', () => {
    const scripts = document.querySelectorAll('script[type="application/jshm"]');
    scripts.forEach(s => {
        const src = s.getAttribute('src');
        if (src) loadJSHM(src);
    });
});

        // --- 4. 【基本実行系】 ---
        else if (tag === 'js-func' || (tag === 'js-if' && this.safeEval(cond))) {
            this.execute(code);
        } else if (tag === 'js-on') {
            document.getElementById(val!)?.addEventListener(name!, () => this.execute(code));
        }
    }

    private safeEval(exp: string | null) {
        if (!exp) return null;
        return new Function('vars', `with(vars){ return ${exp} }`)(jsMemory);
    }

    private execute(logic: string) {
        return new Function('vars', `with(vars){ ${logic} }`)(jsMemory);
    }
}

// 全タグ一括登録
const allJsTags = [
    'js-let', 'js-const', 'js-delete', 'js-export', 
    'js-for', 'js-switch', 'js-case', 'js-if', 
    'js-class', 'js-def', 'js-func', 'js-async', 'js-on'
];
allJsTags.forEach(t => customElements.define(t, JSFullPowerEngine));
