import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
}

export function LanguageToggle({ fullWidth, variant = 'outlined', size }: LanguageToggleProps) {
  const { i18n, t } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <Button
      onClick={() => i18n.changeLanguage(isSpanish ? 'en' : 'es')}
      variant={variant}
      color="secondary"
      fullWidth={fullWidth}
      size={size}
    >
      {isSpanish ? t('languageToggle.toEnglish') : t('languageToggle.toSpanish')}
    </Button>
  );
}
