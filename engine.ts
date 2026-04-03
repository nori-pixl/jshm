// 1. メモリ管理
const jsMemory: Record<string, any> = { ...window };
// 1. HTMLタグを含んだ変数を作成
let jshm = '<div style="color: red;">これはJSで定義したHTMLです</div>';
// 1. 新しい <div> 要素を生成（定義）
let newElement = document.createElement('div');

// 2. 中身や属性を設定
newElement.textContent = "新しく作られた要素です";
newElement.className = "my-class";

// 3. 画面上の好きな場所（例：bodyの最後）に追加
document.body.appendChild(newElement);

// 2. id="result" の要素に、変数の中身を「HTML」として流し込む
document.getElementById('result').innerHTML = jshm;

class JSFullPowerEngine extends HTMLElement {
    async connectedCallback() {
        const tag = this.tagName.toLowerCase();
        const name = this.getAttribute('name');
        const val = this.getAttribute('val');
        const cond = this.getAttribute('cond');
        const code = this.textContent || "";

        // --- 定義系 ---
        if (tag === 'js-let' || tag === 'js-const') {
            jsMemory[name!] = this.safeEval(val);
        } else if (tag === 'js-delete') {
            delete jsMemory[name!];
        }

        // --- 制御構文系 ---
        else if (tag === 'js-for') {
            const parts = cond?.split(';') || []; // partsをここで定義
            const setup = parts[0] || "";
            const test = parts[1] || "true";
            const update = parts[2] || "";
            new Function('vars', `with(vars){ for(${setup}; ${test}; ${update}){ ${code} } }`)(jsMemory);
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
        } else if (tag === 'js-if' && this.safeEval(cond)) {
            this.execute(code);
        }

        // --- 実行・イベント系 ---
        else if (tag === 'js-func') {
            this.execute(code);
        } else if (tag === 'js-on') {
            document.getElementById(val!)?.addEventListener(name!, () => this.execute(code));
        }
    }

    // --- ここから下のメソッドは connectedCallback の外（クラスの直下）に書く ---
    private safeEval(exp: string | null) {
        if (!exp) return null;
        try {
            return new Function('vars', `with(vars){ return ${exp} }`)(jsMemory);
        } catch {
            return exp;
        }
    }

    private execute(logic: string) {
        try {
            return new Function('vars', `with(vars){ ${logic} }`)(jsMemory);
        } catch (e) {
            console.error("[JSHM Error]", e);
        }
    }
}

// タグの登録
const tags = ['js-let', 'js-const', 'js-delete', 'js-for', 'js-switch', 'js-case', 'js-if', 'js-func', 'js-on'];
tags.forEach(t => customElements.define(t, JSFullPowerEngine));
