import { formatDuration } from '../video';

describe('formatDuration', () => {
    describe('minutes and seconds only (< 1 hour)', () => {
        it('should format 125 seconds as "2:05"', () => {
            expect(formatDuration(125)).toBe('2:05');
        });

        it('should format 0 seconds as "0:00"', () => {
            expect(formatDuration(0)).toBe('0:00');
        });

        it('should format 59 seconds as "0:59"', () => {
            expect(formatDuration(59)).toBe('0:59');
        });

        it('should format 60 seconds as "1:00"', () => {
            expect(formatDuration(60)).toBe('1:00');
        });

        it('should format 195 seconds as "3:15"', () => {
            expect(formatDuration(195)).toBe('3:15');
        });

        it('should format 599 seconds as "9:59"', () => {
            expect(formatDuration(599)).toBe('9:59');
        });

        it('should format 3599 seconds as "59:59"', () => {
            expect(formatDuration(3599)).toBe('59:59');
        });
    });

    describe('hours, minutes and seconds (>= 1 hour)', () => {
        it('should format 3600 seconds as "1:00:00"', () => {
            expect(formatDuration(3600)).toBe('1:00:00');
        });

        it('should format 3661 seconds as "1:01:01"', () => {
            expect(formatDuration(3661)).toBe('1:01:01');
        });

        it('should format 3665 seconds as "1:01:05"', () => {
            expect(formatDuration(3665)).toBe('1:01:05');
        });

        it('should format 7265 seconds as "2:01:05"', () => {
            expect(formatDuration(7265)).toBe('2:01:05');
        });

        it('should format 36000 seconds as "10:00:00"', () => {
            expect(formatDuration(36000)).toBe('10:00:00');
        });
    });

    describe('edge cases', () => {
        it('should pad single digit seconds with zero', () => {
            expect(formatDuration(5)).toBe('0:05');
            expect(formatDuration(65)).toBe('1:05');
            expect(formatDuration(3605)).toBe('1:00:05');
        });

        it('should pad single digit minutes with zero when hours present', () => {
            expect(formatDuration(3660)).toBe('1:01:00');
            expect(formatDuration(3720)).toBe('1:02:00');
            expect(formatDuration(3900)).toBe('1:05:00');
        });

        it('should handle large durations', () => {
            expect(formatDuration(359999)).toBe('99:59:59');
        });

        it('should not pad minutes when no hours', () => {
            expect(formatDuration(600)).toBe('10:00');
            expect(formatDuration(1800)).toBe('30:00');
            expect(formatDuration(3000)).toBe('50:00');
        });
    });

    describe('real video durations from mock data', () => {
        it('should format short video (3 min)', () => {
            expect(formatDuration(180)).toBe('3:00');
        });

        it('should format medium video (15 min)', () => {
            expect(formatDuration(900)).toBe('15:00');
        });

        it('should format long video (1 hour)', () => {
            expect(formatDuration(3600)).toBe('1:00:00');
        });

        it('should format very long video (1.5 hours)', () => {
            expect(formatDuration(5400)).toBe('1:30:00');
        });
    });
});