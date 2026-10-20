import React, { useState, useMemo, useEffect } from 'react';
import { Substance, SubstanceState, SubstanceCategory } from '../types/density';
import { DEFAULT_SUBSTANCES } from '../data/materials';
import { formatNumber } from '../utils/units';
import { Search, Plus, Trash2, ArrowUpRight, Check, Filter } from 'lucide-react';

interface MaterialTableProps {
  onSelectMaterial: (sub: Substance) => void;
  onSimulateBuoyancy: (sub: Substance) => void;
}

export const MaterialTable: React.FC<MaterialTableProps> = ({
  onSelectMaterial,
  onSimulateBuoyancy,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [customSubstances, setCustomSubstances] = useState<Substance[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New substance form state
  const [newName, setNewName] = useState('');
  const [newDensity, setNewDensity] = useState('');
  const [newCategory, setNewCategory] = useState<SubstanceCategory>('metal');
  const [newState, setNewState] = useState<SubstanceState>('solid');
  const [newDesc, setNewDesc] = useState('');

  // Load custom substances from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('density_custom_materials');
      if (saved) {
        setCustomSubstances(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveCustomSubstances = (items: Substance[]) => {
    setCustomSubstances(items);
    localStorage.setItem('density_custom_materials', JSON.stringify(items));
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const dVal = parseFloat(newDensity);
    if (!newName.trim() || isNaN(dVal) || dVal <= 0) return;

    const newSub: Substance = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      nameEn: newName.trim(),
      state: newState,
      category: newCategory,
      density: dVal,
      densitySI: dVal * 1000,
      condition: '自定义测试数据',
      description: newDesc.trim() || '用户自定义测量物质',
      color: '#6366F1',
      isCustom: true,
    };

    saveCustomSubstances([newSub, ...customSubstances]);
    setShowAddModal(false);
    setNewName('');
    setNewDensity('');
    setNewDesc('');
  };

  const handleDeleteCustom = (id: string) => {
    saveCustomSubstances(customSubstances.filter((s) => s.id !== id));
  };

  // Combine default and custom
  const allSubstances = useMemo(() => {
    return [...customSubstances, ...DEFAULT_SUBSTANCES];
  }, [customSubstances]);

  // Filtered and sorted
  const filteredList = useMemo(() => {
    return allSubstances
      .filter((sub) => {
        const matchesSearch =
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (sub.formula && sub.formula.toLowerCase().includes(searchTerm.toLowerCase()));

        if (!matchesSearch) return false;

        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'solid') return sub.state === 'solid';
        if (selectedCategory === 'liquid') return sub.state === 'liquid';
        if (selectedCategory === 'gas') return sub.state === 'gas';
        if (selectedCategory === 'custom') return sub.isCustom;
        if (selectedCategory === 'float') return sub.density < 1.0;
        if (selectedCategory === 'sink') return sub.density > 1.0;
        return sub.category === selectedCategory;
      })
      .sort((a, b) => {
        return sortOrder === 'desc' ? b.density - a.density : a.density - b.density;
      });
  }, [allSubstances, searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">常用物质密度数据库</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              内置科学标准固体、液体、气体密度常数表（含常温20℃、标准状况0℃标定）。支持一键填入计算器与浮沉对比。
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>添加自定义物质</span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索物质名称 / 英文名 / 化学式 (如: 铁, Fe, 水, Al, 酒精...)"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Sort order toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center gap-1 shrink-0"
            >
              <span>密度排序: {sortOrder === 'desc' ? '由大到小 ↓' : '由小到大 ↑'}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { id: 'all', label: '全部物质' },
            { id: 'solid', label: '固态 (含金属/非金属)' },
            { id: 'liquid', label: '液态 (水/油/水银/酒精)' },
            { id: 'gas', label: '气态 (空气/氧气/氢气)' },
            { id: 'float', label: '能浮在水面 (ρ < 1.0)' },
            { id: 'sink', label: '在水中下沉 (ρ > 1.0)' },
            { id: 'custom', label: `自定义 (${customSubstances.length})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Material Table Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">物质名称 / 标识</th>
                <th className="py-3 px-4 font-semibold">物态</th>
                <th className="py-3 px-4 font-semibold">密度 (g/cm³)</th>
                <th className="py-3 px-4 font-semibold">国际单位 (kg/m³)</th>
                <th className="py-3 px-4 font-semibold">水沉浮特性</th>
                <th className="py-3 px-4 font-semibold">测量条件与描述</th>
                <th className="py-3 px-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredList.map((sub) => {
                const isWaterFloat = sub.density < 1.0;
                const isWaterEqual = sub.density === 1.0;
                return (
                  <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Name & Formula */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border border-slate-300"
                          style={{ backgroundColor: sub.color }}
                        />
                        <div>
                          <span className="font-bold text-slate-900">{sub.name}</span>
                          {sub.formula && (
                            <span className="ml-1.5 text-xs font-mono text-slate-500">
                              [{sub.formula}]
                            </span>
                          )}
                          {sub.isCustom && (
                            <span className="ml-1.5 text-xs font-mono text-indigo-600 font-bold">
                              · 自定义
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* State */}
                    <td className="py-3 px-4 text-xs font-medium text-slate-600">
                      {sub.state === 'solid'
                        ? '固态'
                        : sub.state === 'liquid'
                        ? '液态'
                        : '气态'}
                    </td>

                    {/* Density in g/cm3 */}
                    <td className="py-3 px-4 font-mono font-bold text-blue-700 tabular-nums">
                      {formatNumber(sub.density, 4)}
                    </td>

                    {/* Density in kg/m3 (SI) */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700 tabular-nums">
                      {formatNumber(sub.densitySI, 2)}
                    </td>

                    {/* Float in water */}
                    <td className="py-3 px-4">
                      {isWaterEqual ? (
                        <span className="text-xs font-semibold text-teal-700">悬浮</span>
                      ) : isWaterFloat ? (
                        <span className="text-xs font-semibold text-sky-700">漂浮 (浮水)</span>
                      ) : (
                        <span className="text-xs font-medium text-slate-500">沉底</span>
                      )}
                    </td>

                    {/* Conditions and Desc */}
                    <td className="py-3 px-4 max-w-xs text-xs text-slate-500">
                      <div className="truncate font-sans" title={sub.description}>
                        {sub.description}
                      </div>
                      <div className="text-slate-400 font-mono text-2xs">{sub.condition}</div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectMaterial(sub)}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          title="将此物质密度代入计算器"
                        >
                          填入计算器
                        </button>
                        <button
                          onClick={() => onSimulateBuoyancy(sub)}
                          className="px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                          title="在浮力水槽中进行浮沉实验"
                        >
                          浮沉实验
                        </button>
                        {sub.isCustom && (
                          <button
                            onClick={() => handleDeleteCustom(sub.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="删除自定义数据"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredList.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            没有找到与 “{searchTerm}” 相关的物质
          </div>
        )}
      </div>

      {/* Add Custom Substance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">添加自定义测量物质</h3>
            <form onSubmit={handleAddCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">物质名称</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="例如: 某新型树脂 / 自制合金"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    密度 (g/cm³)
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={newDensity}
                    onChange={(e) => setNewDensity(e.target.value)}
                    placeholder="如: 1.25"
                    className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">物理状态</label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value as SubstanceState)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 outline-none"
                  >
                    <option value="solid">固态</option>
                    <option value="liquid">液态</option>
                    <option value="gas">气态</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">备注说明</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="如: 实验室电子秤与量筒测得"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs"
                >
                  保存物质
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
