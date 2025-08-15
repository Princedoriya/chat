"use client";
import { useState } from "react";

interface Item {
  text: string;
  correctCategory?: string;
  selectedCategory?: string;
}

export default function CategorizeEditor({ data, onChange }: any) {
  const [categories, setCategories] = useState<string[]>(data.categories || ["Category 1"]);
  const [items, setItems] = useState<Item[]>(data.items || []);

  function addCategory() {
    const name = `Category ${categories.length + 1}`;
    const nc = [...categories, name];
    setCategories(nc);
    onChange({ categories: nc, items });
  }
  function addItem() {
    const it = [...items, { text: `Item ${items.length + 1}`, correctCategory: categories[0] }];
    setItems(it);
    onChange({ categories, items: it });
  }

  function updateItem(i: number, key: keyof Item, value: any) {
    const cp = [...items];
    cp[i] = { ...cp[i], [key]: value };
    setItems(cp);
    onChange({ categories, items: cp });
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-lg">
      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={addCategory}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Category
        </button>
        <button
          onClick={addItem}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + Item
        </button>
      </div>

      {/* Categories & Items Editor */}
      <div className="grid grid-cols-2 gap-6">
        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-3 text-lime-400">Categories</h4>
          <ul className="space-y-3">
            {categories.map((c, idx) => (
              <li key={idx}>
                <input
                  value={c}
                  onChange={(e) => {
                    const nc = [...categories];
                    nc[idx] = e.target.value;
                    setCategories(nc);
                    onChange({ categories: nc, items });
                  }}
                  className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none bg-white text-gray-900"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Items */}
        <div>
          <h4 className="font-semibold mb-3 text-lime-400">Items</h4>
          <ul className="space-y-3">
            {items.map((it, i) => (
              <li
                key={i}
                className="p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
              >
                <input
                  value={it.text}
                  onChange={(e) => updateItem(i, "text", e.target.value)}
                  className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 text-gray-900"
                />
                <label className="text-sm font-medium text-gray-900">Correct Category</label>
                <select
                  value={it.correctCategory}
                  onChange={(e) => updateItem(i, "correctCategory", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 text-gray-900"
                >
                  {categories.map((c, idx) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preview Section */}
      <div>
        <h4 className="font-semibold mb-3 text-lime-400">Preview (Drag items into categories)</h4>
        <div className="grid grid-cols-2 gap-6">
          {/* Items List */}
          <div>
            <h5 className="mb-2 font-medium text-lime-400">Items</h5>
            <div className="p-3 border rounded-lg min-h-[120px] bg-gray-50 shadow-inner">
              {items.map((it, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
                  className="p-2 border rounded-lg bg-white text-gray-900 shadow-sm mb-2 cursor-move hover:shadow-md transition"
                >
                  {it.text}
                </div>
              ))}
            </div>
          </div>

          {/* Drop Zones */}
          <div>
            <h5 className="mb-2 font-medium text-lime-400">Drop Zones</h5>
            <div className="space-y-3">
              {categories.map((c, ci) => (
                <div
                  key={ci}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const idx = Number(e.dataTransfer.getData("text/plain"));
                    updateItem(idx, "selectedCategory", c);
                  }}
                  className="p-4 border rounded-lg bg-gray-50 min-h-[70px] hover:bg-gray-100 transition"
                >
                  <strong className="text-gray-800">{c}</strong>
                  <div className="mt-2 space-y-1">
                    {items
                      .filter((it) => it.selectedCategory === c)
                      .map((it, ii) => (
                        <div
                          key={ii}
                          className="p-2 text-sm bg-white text-gray-900 border rounded-lg shadow-sm"
                        >
                          {it.text}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
