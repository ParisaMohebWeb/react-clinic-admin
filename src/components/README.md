# کامپوننت‌های قابل استفاده مجدد

این پوشه شامل کامپوننت‌های قابل استفاده مجدد در سراسر برنامه است.

## ساختار کامپوننت‌ها

```
components/
├── Layout/              # کامپوننت‌های چیدمان
│   ├── Layout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   └── index.ts
├── UI/                  # کامپوننت‌های رابط کاربری
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── Table/
│   ├── Card/
│   └── Loading/
├── Forms/               # کامپوننت‌های فرم
│   ├── PatientForm/
│   ├── DoctorForm/
│   ├── AppointmentForm/
│   └── SearchForm/
└── Charts/              # کامپوننت‌های نمودار
    ├── LineChart/
    ├── BarChart/
    └── PieChart/
```

## کامپوننت‌های موجود

### Layout Components

#### Layout.tsx
کامپوننت اصلی چیدمان که شامل Header، Sidebar، Main Content و Footer است.

**Props:**
- ندارد

**Usage:**
```tsx
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Child routes */}
        </Route>
      </Routes>
    </Router>
  );
}
```

#### Header.tsx
هدر برنامه با منوی ناوبری و دکمه‌های کاربری.

**Features:**
- لوگو و نام کلینیک
- منوی ناوبری اصلی
- دکمه ورود/خروج
- منوی موبایل (همبرگر)

**State:**
- `isMenuOpen`: وضعیت باز/بسته بودن منوی موبایل

#### Sidebar.tsx
منوی کناری با لینک‌های مختلف بخش‌های برنامه.

**Features:**
- منوی کناری با آیکون‌ها
- نمایش صفحه فعال
- اطلاعات نسخه سیستم

**Props:**
- ندارد (از useLocation برای تشخیص صفحه فعال استفاده می‌کند)

#### Footer.tsx
فوتر برنامه با اطلاعات کلینیک و لینک‌های مفید.

**Features:**
- اطلاعات کلینیک
- لیست خدمات
- اطلاعات تماس
- ساعات کاری
- کپی‌رایت

## نمونه کامپوننت UI

### Button Component

```tsx
// components/UI/Button/Button.tsx
import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="btn-loading">⏳</span>}
      {children}
    </button>
  );
};

export default Button;
```

### Input Component

```tsx
// components/UI/Input/Input.tsx
import React from 'react';
import './Input.scss';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
```

### Modal Component

```tsx
// components/UI/Modal/Modal.tsx
import React, { useEffect } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal-${size}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          {showCloseButton && (
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
```

## نمونه کامپوننت Form

### PatientForm Component

```tsx
// components/Forms/PatientForm/PatientForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import './PatientForm.scss';

interface PatientFormData {
  firstName: string;
  lastName: string;
  nationalCode: string;
  phone: string;
  email?: string;
  birthDate: string;
  gender: 'male' | 'female';
  address?: string;
}

interface PatientFormProps {
  initialData?: Partial<PatientFormData>;
  onSubmit: (data: PatientFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    defaultValues: initialData,
  });

  return (
    <form className="patient-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <Input
          label="نام"
          placeholder="نام بیمار"
          value={register('firstName').value || ''}
          onChange={register('firstName').onChange}
          error={errors.firstName?.message}
          required
        />
        <Input
          label="نام خانوادگی"
          placeholder="نام خانوادگی بیمار"
          value={register('lastName').value || ''}
          onChange={register('lastName').onChange}
          error={errors.lastName?.message}
          required
        />
      </div>

      <div className="form-row">
        <Input
          label="کد ملی"
          placeholder="کد ملی"
          value={register('nationalCode').value || ''}
          onChange={register('nationalCode').onChange}
          error={errors.nationalCode?.message}
          required
        />
        <Input
          label="شماره تلفن"
          placeholder="شماره تلفن"
          type="tel"
          value={register('phone').value || ''}
          onChange={register('phone').onChange}
          error={errors.phone?.message}
          required
        />
      </div>

      <div className="form-actions">
        <Button type="submit" loading={loading}>
          ذخیره
        </Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            انصراف
          </Button>
        )}
      </div>
    </form>
  );
};

export default PatientForm;
```

## قوانین نام‌گذاری

1. **فایل‌ها**: PascalCase (مثل `PatientForm.tsx`)
2. **کامپوننت‌ها**: PascalCase (مثل `PatientForm`)
3. **Props**: camelCase (مثل `onSubmit`)
4. **CSS Classes**: kebab-case (مثل `patient-form`)
5. **Constants**: UPPER_SNAKE_CASE (مثل `API_BASE_URL`)

## ساختار فایل کامپوننت

هر کامپوننت باید شامل فایل‌های زیر باشد:

```
ComponentName/
├── ComponentName.tsx     # کامپوننت اصلی
├── ComponentName.scss    # استایل‌ها
├── ComponentName.test.tsx # تست‌ها
├── index.ts             # Export
└── README.md            # مستندات کامپوننت
```

## تست کامپوننت‌ها

```tsx
// components/UI/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

## نکات مهم

1. **TypeScript**: تمام کامپوننت‌ها باید با TypeScript نوشته شوند
2. **Props Interface**: برای هر کامپوننت interface مناسب تعریف کنید
3. **Default Props**: از default props استفاده کنید
4. **Error Handling**: خطاها را به درستی مدیریت کنید
5. **Accessibility**: قابلیت دسترسی را در نظر بگیرید
6. **Performance**: از React.memo برای بهینه‌سازی استفاده کنید
7. **Documentation**: هر کامپوننت را مستند کنید 