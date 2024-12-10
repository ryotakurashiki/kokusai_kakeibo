import { Link } from 'react-router-dom'
import './ExpenseRegistration.module.css'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import axios from 'axios';
import * as adapter from '../../api/adapter';
import { useEffect, useState } from 'react';

// ToDo: 型定義移す
type LargeCategory = {
  id: number;
  name: string;
};

type MiddleCategory = {
  id: number;
  large_category_id: number;
  name: string;
};

type Currency = {
  id: number;
  name: string;
  symbol: string;
}

// バリデーションスキーマ
const validationSchema = yup.object().shape({
  amount: yup.number().required('金額を入力してください').positive('正の数値を入力してください'),
  payment_date: yup.string().required('支払日を入力してください'),
  name: yup.string().required('名前を入力してください').max(50, '名前は50文字以内で入力してください'),
  large_category_id: yup.number().required('大カテゴリーを選択してください'),
  middle_category_id: yup.number().required('中カテゴリーを選択してください'),
  currency_id: yup.number().required('通貨を選択してください'),
});

type FormData = {
  amount: number;
  payment_date: string;
  name: string;
  large_category_id: number;
  middle_category_id: number;
  currency_id: number;
};

function ExpenseRegistration() {

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [largeCategories, setLargeCategories] = useState<(LargeCategory & { middle_categories: MiddleCategory[] })[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedLargeCategory, setSelectedLargeCategory] = useState<(LargeCategory & { middle_categories: MiddleCategory[] })>();

  useEffect(() => {
    adapter.large_categories().then(data=>{
      setLargeCategories(data.large_categories);
    });
    // ToDo apiリクエストを切り出す
    axios.get("http://localhost:3000/currencies").then((response) => {
      setCurrencies(response.data.currencies);
    }).catch(error => console.error("currencies fetch error:", error));

  }, []);

  // large_category_idの変更時にmiddle_categoriesをフィルタリング
  const selectedLargeCategoryId = watch("large_category_id");
  useEffect(() => {
    const selectedLargeCategory = largeCategories.find(a=> a.id === Number(selectedLargeCategoryId));
    setSelectedLargeCategory(selectedLargeCategory);
    setValue("middle_category_id", 0); // 親が変わったら子の選択をリセット
  }, [selectedLargeCategoryId, largeCategories, setValue]);

  // フォーム送信
  const onSubmit = (data: FormData) => {
    // ToDo apiリクエストを切り出す
    axios
      .post('http://localhost:3000/create_expense', data)
      .then(() => alert('登録が成功しました'))
      .catch((error) => console.error('登録に失敗しました:', error));
  };

  return (
    <>
      <h1>支出登録</h1>
      <Link to="/home">戻る</Link>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>金額</label>
            <input type="number" {...register('amount')} />
            {errors.amount && <p>{errors.amount.message}</p>}
          </div>

          <div>
            <label>通貨</label>
            <select
              {...register("currency_id", {
                required: "通貨を選択してください",
              })}
              defaultValue=""
            >
              <option value="">選択してください</option>
              {(currencies).map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name}
                </option>
              ))}
            </select>
            {errors.middle_category_id && <p>{errors.middle_category_id.message}</p>}
          </div>

          <div>
            <label>支払日</label>
            <input type="date" {...register('payment_date')} />
            {errors.payment_date && <p>{errors.payment_date.message}</p>}
          </div>

          <div>
            <label>内容</label>
            <input type="text" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label>大カテゴリ</label>
            <select
              {...register("large_category_id", {
                required: "大カテゴリを選択してください",
              })}
              defaultValue=""
            >
              <option value="">選択してください</option>
              {largeCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.large_category_id && <p>{errors.large_category_id.message}</p>}
          </div>

          <div>
            <label>中カテゴリ</label>
            <select
              {...register("middle_category_id", {
                required: "中カテゴリを選択してください",
              })}
              defaultValue=""
            >
              <option value="">選択してください</option>
              {(selectedLargeCategory?.middle_categories || []).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.middle_category_id && <p>{errors.middle_category_id.message}</p>}
          </div>

          <button type="submit">登録</button>
        </form>
      </div>
    </>
  )
}

export default ExpenseRegistration
