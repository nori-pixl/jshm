# jshm

1. データ定義系（主に閉じタグなし）
これらは「メモリ（変数保存場所）」に値をストックする役割です。
<js-let />
役割: 書き換え可能な変数を定義します。
例: <js-let name="score" val="100" />
<js-const />
役割: 書き換え不可（定数）として値を固定します。
<js-array />
役割: リスト（配列）を作ります。valにカンマ区切りで入れます。
例: <js-array name="colors" val="red,blue,green" />
<js-obj />
役割: まとまったデータ（オブジェクト）を作ります。JSON形式で書きます。
<js-bool />
役割: true（真）か false（偽）のスイッチを定義します。
<js-delete />
役割: メモリから特定の変数を削除します。
<js-export />
役割: タグ内の変数を、通常のJavaScript（外部ファイルなど）から見えるように公開します。


2. 実行・イベント系（閉じタグあり）
動きを作ったり、特定のタイミングで処理を走らせる役割です。
<js-func> ... </js-func>
役割: タグが読み込まれた瞬間に、中のコードを即座に実行します。
<js-def name="..."> ... </js-def>
役割: 関数を定義します。後で名前を呼ぶだけで何度でも再利用できます。
<js-on name="..." val="..."> ... </js-on>
役割: ボタン操作などのイベントを予約します。
例: <js-on name="click" val="btnID"> ... </js-on>（ボタンが押されたら実行）
<js-async> ... </js-async>
役割: 非同期処理を行います。await fetch() などでネットからデータを取る時に使います。


3. 制御構文系（プログラムの流れを作る）
条件によって動きを変えたり、繰り返したりする「脳」の部分です。
<js-if cond="..."> ... </js-if>
役割: cond（条件）が正しいときだけ、中身を実行します。
<js-for cond="..."> ... </js-for>
役割: 指定した回数だけ、中身を繰り返し実行します。
<js-switch val="..."> / <js-case>
役割: 値が「Aのとき」「Bのとき」と、多くの選択肢から分岐させます。
<js-while val="..."> ... </js-while>
役割: 条件が満たされている間、ずっと繰り返します。
<js-try> ... </js-try> / <js-catch>
役割: エラーが起きそうな処理を監視し、起きた場合のバックアップ（catch）を用意します。
<js-class name="..." extends="..."> ... </js-class>
役割: 設計図（クラス）を作ります。extendsを使えば他の設計図を継承（パワーアップ）できます。


# jshm

1. Data Definition (Mainly without closing tags)
These are responsible for storing values ​​in "memory (variable storage location)".
<js-let />
Role: Defines a mutable variable.
Example: <js-let name="score" val="100" />
<js-const />
Role: Fixes a value as immutable (constant).
<js-array />
Role: Creates a list (array). Values ​​are stored in val separated by commas.
Example: <js-array name="colors" val="red,blue,green" />
<js-obj />
Role: Creates a set of data (object). Written in JSON format.
<js-bool />
Role: Defines a switch that is either true or false.
<js-delete />
Role: Deletes a specific variable from memory.
<js-export />
Role: Exposes variables within tags so they can be seen from normal JavaScript (external files, etc.). 2. Execution/Event-Based (with closing tags)
These are responsible for creating movement and running processes at specific times.
<js-func> ... </js-func>
Role: Executes the code inside immediately the moment the tag is loaded.
<js-def name="..."> ... </js-def>
Role: Defines a function. Can be reused any number of times by simply calling the name later.
<js-on name="..." val="..."> ... </js-on>
Role: Schedules events such as button presses.
Example: <js-on name="click" val="btnID"> ... </js-on> (Executes when the button is pressed)
<js-async> ... </js-async>
Role: Performs asynchronous processing. Used when retrieving data from the internet using await fetch(), etc.

3. Control Structures (Creating the Program Flow)
This is the "brain" part that changes or repeats actions based on conditions.

<js-if cond="..."> ... </js-if>
Role: Executes the contents only when the cond (condition) is true.
<js-for cond="..."> ... </js-for>
Role: Repeats the contents the specified number of times.
<js-switch val="..."> / <js-case>
Role: Branches from many options, such as "when the value is A" or "when the value is B".
<js-while val="..."> ... </js-while>
Role: Repeats indefinitely as long as the condition is met.
<js-try> ... </js-try> / <js-catch>
Role: Monitors processes that are likely to cause errors and provides a backup (catch) in case an error occurs.
<js-class name="..." extends="..."> ... </js-class>
Role: Creates a blueprint (class). Using extends allows you to inherit (power up) other blueprints.
