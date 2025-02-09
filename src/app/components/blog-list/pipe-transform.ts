// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value) return '';
    // Normaliza el texto reemplazando saltos de línea
    const normalized = value.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    if (normalized.length <= limit) return normalized;
    return normalized.substring(0, limit) + '...';
  }
}
