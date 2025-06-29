package net.engineeringdigest.journalApp.service;
import net.engineeringdigest.journalApp.Entity.JournalEntry;
import net.engineeringdigest.journalApp.Entity.User;
import net.engineeringdigest.journalApp.repository.JournalEntryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class JournalEntryService {

    @Autowired
    public JournalEntryService(JournalEntryRepository journalEntryRepository) {
        this.journalEntryRepository = journalEntryRepository;
    }
    @Autowired
    private UserService userService;

    private JournalEntryRepository journalEntryRepository;

    @Transactional
    public void saveEntry(JournalEntry journalEntry, String userName) {
        try{
            User user=userService.findByUserName(userName);
            journalEntry.setDate(LocalDateTime.now());
            JournalEntry saved=journalEntryRepository.save(journalEntry);
            user.getJournalEntries().add(saved);
            userService.saveUser(user);
        }
        catch (Exception e) {

            throw new RuntimeException("An error occurred while saving the entry",e);
        }

    }
    public void saveEntry(JournalEntry journalEntry) {
        journalEntryRepository.save(journalEntry);
    }
    public List<JournalEntry> getAll(){
        return journalEntryRepository.findAll();
    }
    public Optional<JournalEntry> findById(String id){
        return journalEntryRepository.findById(new ObjectId(id));
    }

    @Transactional
    public boolean deleteById(ObjectId id, String userName){
        boolean removed=false;
        try{
            User user=userService.findByUserName(userName);
            removed=user.getJournalEntries().removeIf(x -> x.getId().equals(id.toHexString()));
            if(removed){
                userService.saveUser(user);
                journalEntryRepository.deleteById(id);
                removed=true;
            }


        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the entry",e);
        }
        return removed;
    }


}
