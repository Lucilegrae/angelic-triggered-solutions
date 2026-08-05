#!/data/data/com.termux/files/usr/bin/bash

echo "==============================================="
echo " ATS PORTAL TERMUX SYSTEM CHECK-UP"
echo "==============================================="

echo ""
echo ">>> 1. CURRENT PATH"
pwd

echo ""
echo ">>> 2. CHECK GIT STATUS"
git status

echo ""
echo ">>> 3. CHECK GIT REMOTE ORIGIN"
git remote -v

echo ""
echo ">>> 4. CHECK BRANCH"
git branch

echo ""
echo ">>> 5. CHECK DIRECTORY STRUCTURE"
ls -R | sed 's/^/    /'

echo ""
echo ">>> 6. CHECK ATS PORTAL SUPABASE FUNCTIONS"
if [ -d "ats-portal/supabase/functions" ]; then
    ls ats-portal/supabase/functions
else
    echo "    [ERROR] ats-portal/supabase/functions NOT FOUND"
fi

echo ""
echo ">>> 7. CHECK ATS PORTAL SUPABASE MIGRATIONS"
if [ -d "ats-portal/supabase/migrations" ]; then
    ls ats-portal/supabase/migrations
else
    echo "    [ERROR] ats-portal/supabase/migrations NOT FOUND"
fi

echo ""
echo ">>> 8. CHECK IF OLD SUPABASE FOLDERS STILL EXIST"
if [ -d "supabase" ]; then
    echo "    WARNING: supabase folder still exists"
    ls supabase
fi

if [ -d "supabase_old" ]; then
    echo "    supabase_old exists (OK)"
fi

if [ -d "ats-supabase" ]; then
    echo "    WARNING: ats-supabase folder still exists"
    ls ats-supabase
fi

if [ -d "ats-supabase_old" ]; then
    echo "    ats-supabase_old exists (OK)"
fi

echo ""
echo ">>> 9. CHECK NODE VERSION"
node -v

echo ""
echo ">>> 10. CHECK NPM VERSION"
npm -v

echo ""
echo ">>> 11. CHECK BUN VERSION (if installed)"
bun -v 2>/dev/null || echo "bun not installed"

echo ""
echo ">>> 12. CHECK PNPM VERSION (if installed)"
pnpm -v 2>/dev/null || echo "pnpm not installed"

echo ""
echo ">>> 13. CHECK SUPABASE CONFIG"
if [ -f "ats-portal/supabase/config.toml" ]; then
    echo "    config.toml found"
else
    echo "    [ERROR] config.toml missing"
fi

echo ""
echo ">>> 14. CHECK INTERNET CONNECTIVITY"
ping -c 1 google.com >/dev/null 2>&1 && echo "    Internet OK" || echo "    Internet DOWN"

echo ""
echo "==============================================="
echo " CHECK-UP COMPLETE"
echo "==============================================="
