// Last Text at One Percent — the final text message a phone sends at one
// percent battery, under 200 characters, in the dying phone's own voice.
// Writes the message to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

class TextEmitter {
  private readonly dir = "/output";
  private readonly file = "/output/entry.txt";

  private measure(text: string): number {
    const n = [...text].length;
    if (n < 1 || n > 200) {
      throw new Error(`message is ${n} chars, must be 1-200`);
    }
    return n;
  }

  async run(text: string): Promise<void> {
    const n = this.measure(text);
    await mkdir(this.dir, { recursive: true });
    await writeFile(this.file, text, { encoding: "utf8" });
    console.log(`wrote ${n} chars to ${this.file}`);
  }
}

const LINE =
  "Tell the charger I loved it. Also tell my owner I saw everything in their camera roll. Goodbye.";

await new TextEmitter().run(LINE);
