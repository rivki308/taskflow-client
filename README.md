<div align="center">

# 📋 TaskFlow Pro

**מערכת לניהול משימות בצוות – צד לקוח**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)

</div>

---

## ✨ על הפרויקט

**TaskFlow Pro** היא מערכת לניהול משימות בצוות עם שני סוגי משתמשים:

- 👩‍💼 **מנהלת** – יוצרת פרויקטים ומשימות, משייכת אותן לעובדים ומנהלת את רשימת העובדים.
- 👩‍💻 **עובדת** – רואה רק את המשימות שלה, מעדכנת סטטוס ומוסיפה הערות.

הממשק כתוב בעברית, מימין לשמאל (RTL).

## 🖥️ מסכים

| מסך | תיאור | מי רואה |
|---|---|---|
| 🔐 התחברות | כניסה למערכת עם אימייל וסיסמה | כולם |
| 📊 לוח בקרה | סיכום מספרים לפי תפקיד | כולם |
| ✅ רשימת משימות | חיפוש, סינון, מיון ועימוד | כולם |
| 📝 פרטי משימה | שינוי סטטוס והערות, עריכה ומחיקה | כולם (עריכה ומחיקה – מנהלת) |
| ➕ יצירה ועריכה של משימה | טופס עם בדיקת תקינות | מנהלת |
| 👥 עובדים | רשימה, הוספה ועריכה של עובדים | מנהלת |
| 📁 פרויקטים | רשימה, יצירה ועריכה | כולם (יצירה ועריכה – מנהלת) |

## 🛠️ טכנולוגיות

| טכנולוגיה | שימוש |
|---|---|
| **React + TypeScript** | בניית הממשק |
| **Vite** | סביבת פיתוח ובנייה |
| **Material UI** | רכיבי עיצוב, כולל תמיכה ב-RTL |
| **React Router** | ניווט בין עמודים ונתיבים מוגנים |
| **React Hook Form** | טפסים ובדיקת תקינות |
| **React Query** | כל הקריאות לשרת ושמירה במטמון |
| **Context API** | ניהול המשתמש המחובר |

## 🚀 הרצה מקומית

### דרישות מוקדמות
- [Node.js](https://nodejs.org/) גרסה 20 ומעלה
- [השרת של הפרויקט](https://github.com/rivki308/taskflow-backend) רץ (לפי `START-HERE.md` שם)

### שלבים

```bash
# 1. שכפול הפרויקט
git clone https://github.com/rivki308/taskflow-client.git
cd taskflow-client

# 2. התקנת חבילות
npm install

# 3. יצירת קובץ הגדרות
cp .env.example .env

# 4. הפעלה
npm run dev
```

אחר כך פותחים בדפדפן את http://localhost:5173

### משתני סביבה

| משתנה | תיאור | ברירת מחדל |
|---|---|---|
| `VITE_API_URL` | כתובת השרת | `http://localhost:4000` |

### פקודות

| פקודה | מה היא עושה |
|---|---|
| `npm run dev` | הפעלת סביבת פיתוח |
| `npm run build` | בנייה לפרודקשן |
| `npm run preview` | תצוגה מקדימה של הבנייה |
| `npm run lint` | בדיקת קוד עם oxlint |

## 👤 משתמשי הדגמה

| תפקיד | אימייל | סיסמה |
|---|---|---|
| מנהלת | `admin@taskflow.test` | `Admin123!` |
| עובדת | `noa@taskflow.test` | `Employee123!` |

## 📂 מבנה התיקיות

```
src/
├── api/          # פונקציות שפונות לשרת
├── assets/       # תמונות ולוגו
├── components/   # רכיבים משותפים (טפסים, תגיות, עימוד...)
├── context/      # המשתמש המחובר
├── pages/        # עמוד לכל מסך
├── styles/       # עיצובים לפי מסך
├── theme/        # ערכת הנושא של MUI
├── types/        # טיפוסי TypeScript
├── ui/           # רכיבי ממשק כלליים (כותרת, פוטר...)
└── utils/        # פונקציות עזר ותרגומים
```
