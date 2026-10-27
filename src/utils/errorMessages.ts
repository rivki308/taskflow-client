 export function getHebrewErrorMessage(code: string): string {
    const messages: Record<string, string> = {
        VALIDATION_ERROR: 'הנתונים שהוזנו אינם תקינים. בדקי את הפרטים.',
        INVALID_JSON: 'נשלחו נתונים בפורמט לא תקין.',
        UNAUTHORIZED: 'יש להתחבר כדי להמשיך.',
        INVALID_TOKEN: 'ההתחברות אינה תקפה. התחברי מחדש.',
        TOKEN_EXPIRED: 'פג תוקף ההתחברות. התחברי מחדש.',
        TOKEN_REVOKED: 'ההתחברות בוטלה. התחברי מחדש.',
        INVALID_CREDENTIALS: 'האימייל או הסיסמה שגויים.',
        FORBIDDEN: 'אין לך הרשאה לבצע פעולה זו.',
        NOT_FOUND: 'הפריט המבוקש לא נמצא.',
        CONFLICT: 'הנתונים מתנגשים עם נתונים קיימים.',
        PAYLOAD_TOO_LARGE: 'הבקשה גדולה מדי.',
        TOO_MANY_REQUESTS: 'בוצעו יותר מדי ניסיונות. נסי שוב בעוד 15 דקות.',
        INTERNAL_ERROR: 'אירעה שגיאה בשרת. נסי שוב.',
        DATABASE_UNAVAILABLE: 'השרת אינו זמין כרגע. נסי שוב מאוחר יותר.',
        UNKNOWN_ERROR: 'אירעה שגיאה בלתי צפויה.',
    };

    return messages[code] ?? 'אירעה שגיאה בעת ביצוע הבקשה.';
}